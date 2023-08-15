import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './router/userRoute.js'
import voteRouter from './router/voteRoute.js'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors({origin:'http://localhost:5173', credentials: true}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter)
app.use('/api/votes', voteRouter)

app.get('/', (req, res)=>{
    res.status(200).send('Server is running')
})


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to Database...');
}).catch(error=>{
    console.log(error);
})

app.listen(8080, ()=>{
    console.log('Server Okay');
})