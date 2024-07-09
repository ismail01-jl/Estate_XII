import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
//import cors from 'cors'
const app = express();
app.use(express.json());
//app.use(cors())


import userRouter from './routes/user.route.js'
app.use('/api/users', userRouter);
import authRouter from './routes/auth.route.js'
app.use('/api/auth', authRouter);


// data base connecting
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log("DataBase Successfully Connected"); })
    .catch(err => {
        console.log("Unable to connect to database", err);
        process.exit();
    });
// requête 
app.get("/", (req, res) => {
    res.send("hello si ismail");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
