import dotenv from 'dotenv';
dotenv.config();

import connectDB from './database/connection.js';
import express from 'express';

import commetnRouter from './modules/comment/commentRouter.js';
import articleRouter from './modules/article/articleRouter.js';

console.log('MONGO_URI:', process.env.DBURI);
console.log('PORT:', process.env.PORT);


const app = express();
app.use(express.json());

connectDB();

app.use('/api/article', articleRouter);
app.use('/api/comment', commetnRouter);

app.listen(3000, () => { console.log("Server running") });