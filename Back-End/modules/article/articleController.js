import articleModel from "../../database/models/articleModel.js";

// Article: userid, content, images, likes_num, dislikes_num, comments, reports_num

// create
// TODO: images multer
export const createArticle = async(req, res) => {
    // console.log(req.body);
    // console.log(`received ${req.method} request for ${req.url}`);
    // console.log('request Headers:', req.headers);
    // console.log('request Body:', req.body);

    const {userId, content, images} = req.body;
    
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    
    const newArticle = new articleModel(req.body);
    try
    {
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

// edit 
export const editArticle = async(req, res) => {

    try {
        const article = await articleModel.findById(req.params.articleId);

        if (!article) {
            // bad request
            res.status(400).json('Article not found, ensure the article id is correct')
        }
        // TODO: check the the user ID to be sent in the body of the request
        if (article.userId === req.body.userId) {
            await article.updateOne({content: req.body.content});
            res.status(201).json({message: 'Article edited successfully'});
        }
        else {
            // forbidden
            res.status(403).json('You can edit only your own articles');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// delete
export const deleteArticle = async(req, res) => {
    try {
        const article = await articleModel.findById(req.params.articleId);
        if (!article) {
            // bad request
            res.status(400).json('Article not found, ensure the article id is correct')
        }
        // TODO: check the the user ID to be sent in the body of the request
        if (article.userId === req.body.userId) {
            await article.deleteOne();
            res.status(201).json({message: 'Article deleted successfully'});
        }
        else {
            // forbidden
            res.status(403).json('You can delete only your own articles');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

// like
// no need for number of likes as param
export const likeArticle = async(req, res) => {
    try {
        // TODO: userId to prevint like and dislike from the same user on the same article
        const likedArticle = await articleModel.findByIdAndUpdate(req.params.articleId, {$inc: {likesNum: 1}}, {new: true});
        if (!likedArticle) {
            return res.status(400).json('Article not found, ensure the article id is correct');
        }
        res.status(201).json({message: 'Article liked successfully', likedArticle});

    }
    catch (error) {
        res.status(500).json(error);
    }
}

// dislike
// no need for number of dislikes as param
export const dislikeArticle = async(req, res) => {
    try {
        // TODO: userId to prevint like and dislike from the same user on the same article
        const dislikedArticle = await articleModel.findByIdAndUpdate(req.params.articleId, {$inc: {dislikesNum: 1}}, {new: true});
        if (!dislikedArticle) {
            return res.status(400).json('Article not found, ensure the article id is correct');
        }
        res.status(201).json({message: 'Article disliked successfully', dislikedArticle});

    }
    catch (error) {
        res.status(500).json(error);
    }
}

// report
// no need for number of reports as param
export const reportArticle = async(req, res) => {
    try {
        const article = await articleModel.findByIdAndUpdate(req.params.articleId, {$inc: {reportsNum: 1}}, {new: true});

        if (!article) {
            return res.status(400).json('Article not found, ensure the article id is correct');
        }
        res.status(200).json(article);

    }
    catch (error) {
        res.status(500).json(error);
    }
}

// view article
export const viewArticle = async(req, res) => {
    try {
        const viewedArticle = await articleModel.findById(req.params.articleId);
        if (!viewedArticle) {
            return res.status(400).json('Article not found, ensure the article id is correct');
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
        const articles = await articleModel.find().populate('userId', 'name'); 
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

