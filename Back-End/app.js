import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import connectDB from './database/connection.js';
import  bookRouter from './modules/book/bookRouter.js'
import  userRouter from './modules/user/userRouter.js'

const app = express();
const port = 3000
const baseUrl = '/api'
app.use(express.json())
app.use(`${baseUrl}/book`, bookRouter)
app.use(`${baseUrl}/user`, userRouter)



connectDB()

app.listen(port, () => {
    console.log(`server is running on port ........${port}`);
})