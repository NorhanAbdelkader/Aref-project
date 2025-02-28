import mongoose from 'mongoose'

const connectDB  = async ()=>{
    return await mongoose.connect(process.env.DBURI)
    .then(res=>console.log(`DB Connected successfully`))
    .catch(err=> {
        console.log(`Fail to connect  DB with error: ${err} `)
        process.exit(1)
        })
}

export default connectDB;
