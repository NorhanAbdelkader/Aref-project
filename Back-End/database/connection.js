const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    return await mongoose.connect(process.env.DBURI)
        .then((result) => {
            console.log(`connected DB`);
        }).catch((err) => {
            console.log(err);
            console.log('Fail to connect DB');
        })
        
}
module.exports = connectDB;