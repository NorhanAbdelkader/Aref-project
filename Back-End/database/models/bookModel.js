import mongoose from 'mongoose'
const bookSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'name must be unique value'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
       
    },
   description: {
        type: String,
        required: [true, 'description is required'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        enum:['رواية', 'خيالي', 'علوم', 'واقعي', 'ديني', 'شعر']
    },
    author: {
        type: String,
        required: [true, 'author is required'],
    },
    publisher: {
        type: String,
        required: [true, 'publisher is required'],
    },
    price:{
        type: Number,
        required: [true, 'price is required']
    },
    rate: {
        type: [Number],
        default: [0, 0, 0, 0, 0]
    },
    avgRate:{
        type: Number,
        default: 0
    },
    public_id:{
        type:String
    },
    link: {
        type:String
    }
}, {
    timestamps: true}
,{ strict: false })

const bookModel = mongoose.model('Book', bookSchema)
export default bookModel