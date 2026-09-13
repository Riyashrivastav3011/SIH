import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/authRoutes.js'
import Studentroutes from './routes/studentprofile.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[
    'http://localhost:5173',
    'https://arcass-frontend.onrender.com',
    ],
    credentials:true
}))


app.get('/' , async (req , res)=>{
  res.send('server is running');
})

app.use('/auth' , userRoutes);
app.use('/student' , Studentroutes);

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("mongodb connected");
    app.listen(process.env.PORT , () =>{
        console.log("server is running");
    })
})
.catch((err) =>{
    console.log("db error" , err);
})