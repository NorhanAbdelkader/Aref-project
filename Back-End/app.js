import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })

import connectDB from './database/connection.js';
import express from 'express';


import commetnRouter from './modules/comment/commentRouter.js';
import articleRouter from './modules/article/articleRouter.js';
import replyRouter from './modules/reply/replyRouter.js';
import userRouter from './modules/user/userRouter.js';
import  bookRouter from './modules/book/bookRouter.js'



console.log('PORT:', process.env.PORT);

const app = express();
app.use(express.json());
app.use(cors())


const baseUrl = '/api'

app.use(`${baseUrl}/book`, bookRouter)
app.use(`${baseUrl}/user`, userRouter)
app.use(`${baseUrl}/article`, articleRouter);
app.use(`${baseUrl}/comment`, commetnRouter);
app.use(`${baseUrl}/reply`, replyRouter);
app.use(`${baseUrl}/user`, userRouter);

connectDB();

app.listen(process.env.PORT, () => { console.log("Server running") });

