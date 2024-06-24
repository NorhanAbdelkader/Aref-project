import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

import connectDB from './database/connection.js';
import express from 'express';

import commetnRouter from './modules/comment/commentRouter.js';
import articleRouter from './modules/article/articleRouter.js';
import replyRouter from './modules/reply/replyRouter.js';
import userRouter from './modules/user/userRouter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '/config/.env') })

console.log('PORT:', process.env.PORT);

const app = express();
app.use(express.json());

connectDB();

app.use('/api/article', articleRouter);
app.use('/api/comment', commetnRouter);
app.use('/api/reply', replyRouter);
app.use('/api/user', userRouter);

app.listen(3000, () => { console.log("Server running") });