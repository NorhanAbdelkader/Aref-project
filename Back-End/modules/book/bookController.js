import bookModel from "../../database/models/bookModel.js"
import cloudinary from "../../services/cloudinary.js"

export const addbook=async(req,res)=>{
    try {
        if (!req.file) {
            res.json({ message: "Please upload book photo" })
        } else {
          
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `Aref/books` })
           
         req.body.image=secure_url
         req.body.public_id=public_id
        const newbook= new bookModel (req.body)
        const savedbook = await newbook.save()
        res.json({message:"done",savedbook})
        }
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}
export const updatebook=async(req,res)=>{
    try {
        const {id}=req.params
        const book=await bookModel.findById(id).select("public_id")
        if (req.file) {
            const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
                folder: `Aref/books` })
                if (book.public_id) {
                    console.log(book.public_id)
                    await cloudinary.uploader.destroy(book.public_id);
                }
             req.body.image=secure_url
             req.body.public_id=public_id
        }
        
        
        const updatedbook= await bookModel.findOneAndUpdate ({_id:id},req.body)

        res.json({message:"done",updatedbook})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}

export const deletebook=async(req,res)=>{
    try {
        const {id}=req.params
        const book=await bookModel.findById(id).select("public_id")
        
        const deletedbook= await bookModel.deleteOne ({_id:id})
        if (book.public_id) {
            console.log(book.public_id)
            await cloudinary.uploader.destroy(book.public_id);
        }
       
        res.json({message:"done",deletedbook})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}

export const getbook=async(req,res)=>{
    try {
        const {id}=req.params
        
        const book= await bookModel.findById(id)
       
        res.json({message:"done",book})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}

export const allbooks=async(req,res)=>{
    try {
        
        
        const books= await bookModel.find ({})
       
        res.json({message:"done",books})
    } catch (error) {
        res.json({ message: "catch error",error })
    }

}
export const rateBook=async(req,res)=>{
    try {
        const {id}=req.params
        const{rate}=req.body
        if (!rate || rate< 1 || rate > 5) {
            
            return res.status(400).json({ message: 'Invalid rating. Rating should be between 1 and 5.' });
        }
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });

        }

        const index = rate - 1;
        
        const updatedBook= await bookModel.findOneAndUpdate({ _id: id} ,{ $inc: { [`rate.${index}`]: 1 } } ,{new:true})

        const totalRatings = updatedBook.rate.reduce((sum, count) => sum + count, 0);
       
        const sumOfRatings = updatedBook.rate.reduce((sum, count, idx) =>  sum + count * (idx + 1) , 0);
        
        const avgRate = sumOfRatings / totalRatings;
        // console.log(totalRatings)
        // console.log(sumOfRatings)
        const finalRatedBook = await bookModel.updateOne({ _id: id} ,{ avgRate:avgRate} )

        res.json({message:"done",finalRatedBook})

    } catch (error) {
        res.json({ message: "catch error",error })
    }

}

export const filterbooks=async(req,res)=>{
    try {
        const { author, category, minPrice, maxPrice ,minRate ,maxRate } = req.query;
        
        // Build the query object
        const query = {};

        if (author) {
            query.author = author;
        }

        if (category) {
            // Ensure category is treated as an array
            const categories = Array.isArray(category) ? category : [category];
            query.category = { $in: categories };
        }
        
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }

        if (minRate && maxRate) {
            query.avgRate = { $gte: minRate, $lte: maxRate };
        } else if (minRate) {
            query.avgRate = { $gte: minRate };
        } else if (maxRate) {
            query.avgRate = { $lte: maxRate };
        }
         console.log(query)
        
        const books = await bookModel.find(query);

        res.status(200).json({ message: 'Books retrieved successfully', books });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const sortbooks=async(req,res)=>{
    try {
        const { sortBy, order } = req.query;

        let sortCriteria = { price: 1 };

        
        if (sortBy === 'price') {
            sortCriteria = { price: order === 'desc' ? -1 : 1 };
        } else if (sortBy === 'rate') {
            sortCriteria = { avgRate: order === 'desc' ? -1 : 1 };
        }
     console.log(sortCriteria)
        
        const books = await bookModel.find().sort(sortCriteria);

        res.status(200).json({ message: 'Books sorted successfully', books });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const searchBooksByName=async(req,res)=>{
    try {
        const { Name } = req.query;

        if (!Name) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        
        const books = await bookModel.find({ "name": { $regex: '.*' + Name + '.*' }});

        res.status(200).json({ message: 'Books retrieved successfully', books });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}