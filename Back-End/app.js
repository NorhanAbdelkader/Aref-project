import dotenv from 'dotenv';
dotenv.config();

import connectDB from './database/connection.js';
import express from 'express';

console.log('MONGO_URI:', process.env.DBURI);
console.log('PORT:', process.env.PORT);


const app = express();

connectDB();

app.listen(3000, () => { console.log("Server running") });