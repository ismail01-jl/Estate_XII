import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
//app.use(cors())
const __dirname = path.resolve();

import userRouter from './routes/user.route.js'
app.use('/api/user', userRouter);
import authRouter from './routes/auth.route.js'
app.use('/api/auth', authRouter);
import listingRouter from './routes/listing.route.js'
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// data base connecting
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("connected to database");
    }).catch((err)=>{
        console.log(err);
    });

// requête 
app.get("/", (req, res) => {
    res.send("hello si ismail");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 404;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})