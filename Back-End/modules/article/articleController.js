import articleModel from "../../database/models/articleModel.js";
import userModel from "../../database/models/userModel.js";
import cloudinary from "../../services/cloudinary.js";

// Article: userid, content, images, likes_num, dislikes_num, comments, reports_num

// create DONE:
export const createArticle = async(req, res) => {
    const {userId, content} = req.body;
    
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    const user = await userModel.findById(userId);

    if (!user) {
        res.status(400).json({ error: 'User not found, ensure the user id is correct' });
    }
    const images = [];
    const publicIds = [];

    for(const file of req.files){

        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: 'Aref/article'
            })
        images.push(secure_url);
        publicIds.push(public_id);

    }
    req.body.images = images
    req.body.publicImagesId = publicIds

    try
    {
        const newArticle = new articleModel(req.body);
        const savedArticle = await newArticle.save();
        await user.updateOne({ $addToSet: { articles : savedArticle._id } });

        res.status(201).json(savedArticle);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

// edit DONE:
export const editArticle = async(req, res) => {
    try {
        const {userId, content} = req.body;
        const article = await articleModel.findById(req.params.articleId);

        if (!article) {
            res.status(400).json({ error: 'Article not found, ensure the article id is correct' })
        }
        // TODO: check the the user ID to be sent in the body of the request
        if (article.userId == userId) {
            if (req.files.length) {
                const images = [];
                const publicIds = [];

                for (const file of req.files) {
                    const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                        folder: `Aref/article`
                    });
                    images.push(secure_url);
                    publicIds.push(public_id);
                }

                // delete the old images
                for (const imageId of article.publicImagesId) {
                    await cloudinary.uploader.destroy(imageId)
                }

                await article.updateOne({ content: content, 
                    images:  images, 
                    publicImagesId: publicIds });
            }
            else {
                await article.updateOne({ content: content });
            }

            res.status(201).json({ message: 'Article edited successfully' });
        }
        else {
            // forbidden
            res.status(403).json({ error: 'You can edit only your own articles' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// delete DONE:
export const deleteArticle = async(req, res) => {
    try {
        const articleId = req.params.articleId;
        const userId = req.body.userId;


        const article = await articleModel.findById(articleId);

        if (!article) {
            res.status(400).json({ error: 'Article not found, ensure the article id is correct' })
        }

        const user = await userModel.findById(userId);

        if (!user) {
            // bad request
            res.status(400).json({ error: 'User not found, ensure the user id is correct' });
        }
        // TODO: check the the user ID to be sent in the body of the request
        if (article.userId == userId) {
 
            await user.updateOne({ $pull: { articles: articleId } });
            await article.deleteOne();

            res.status(201).json({ message: 'Article deleted successfully' });
        }
        else {
            res.status(403).json({ error: 'You can delete only your own articles'});
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// like DONE:
// CHECK: need the user id, send it in the body or as param?
export const likeArticle = async(req, res) => {
    const userId = req.user._id;
    const articleId = req.params.articleId;
    console.log(articleId)

    try {
        const article = await articleModel.findById(articleId);
        if (!article) {
            return res.status(400).json({ error: 'Article not found, ensure the article id is correct' });
        }
        if (article.likedUsers.includes(userId)) {
            return res.status(400).json({ error: 'User already liked this article' });
        }

        const update = {
            $addToSet: { likedUsers: userId },
            $pull: { dislikedUsers: userId },
            $inc: { likesNum: 1, dislikesNum: article.dislikedUsers.includes(userId) ? -1 : 0 }
        };

        await articleModel.updateOne({ _id: articleId }, update);
        res.status(201).json({ message: 'Article liked successfully' });

    }
    catch (error) {
        res.status(500).json(error);
    }
}

// dislike DONE:
export const dislikeArticle = async(req, res) => {
    const userId = req.body.userId;
    const articleId = req.params.articleId;

    try {
        const article = await articleModel.findById(articleId);
        if (!article) {
            return res.status(400).json({ error: 'Article not found, ensure the article id is correct' });
        }
        if (article.dislikedUsers.includes(userId)) {
            return res.status(400).json({ error: 'User already disliked this article' });
        }

        const update = {
            $addToSet: { dislikedUsers: userId },
            $pull: { likedUsers: userId },
            $inc: { dislikesNum: 1, likesNum: article.likedUsers.includes(userId) ? -1 : 0 }
        };

        await articleModel.updateOne({ _id: articleId }, update);
        res.status(201).json({ message: 'Article disliked successfully' });

    }
    catch (error) {
        res.status(500).json(error);
    }
}

// report DONE:
export const reportArticle = async(req, res) => {
    const userId = req.body.userId;
    const articleId = req.params.articleId;

    try {
        const article = await articleModel.findById(articleId);

        if (!article) {
            return res.status(400).json({ error: 'Article not found, ensure the article id is correct' });
        }
        if (article.reportedUsers.includes(userId)) {
            return res.status(400).json({ error: 'User already reported this article' });
        }
        const update = {
            $addToSet: { reportedUsers: userId },
            $inc: { reportsNum: 1}
        };

        await articleModel.updateOne({ _id: articleId }, update);
        res.status(200).json({ message: 'Article reported successfully' });

    }
    catch (error) {
        res.status(500).json(error);
    }
}

// view article DONE:
export const viewArticle = async(req, res) => {
    try {
        const viewedArticle = await getArticle(req.params.articleId);
        if (!viewedArticle) {
            return res.status(400).json({ error: 'Article not found, ensure the article id is correct' });
        }
        res.status(200).json(viewedArticle);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// view articles
// TODO: check-> make priority for friends' articles
export const viewArticles = async(req, res) => {
    try {
        const articles = await articleModel.find().populate({
            path: 'comments',
           
            populate: [
              {
                path: 'replies',
                populate: { path: 'userId',select:'name profilePhoto'  } // Populate userId inside replies
              },
              {
                path: 'userId',
                select:'name profilePhoto' // Populate userId inside comments
              }
            ],
            select:'-articleId' 
          })
          .populate({ path: 'userId',
            select:'name profilePhoto' 
           });
        console.log(articles)
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const getArticle = async (articleId) => {
    const article = await articleModel.findById(articleId).populate({ 
        path: 'comments',
        populate: {
          path: 'replies',
          model: 'Reply'
        } 
     })
    .populate({ path: 'userId' });

    return article;
}

