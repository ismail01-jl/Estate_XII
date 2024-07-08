import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

// data base connecting
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log("DataBase Successfully Connected"); })
    .catch(err => {
        console.log("Unable to connect to database", err);
        process.exit();
    });
const app = express();
// requête 
app.get("/", (req, res) => {
    res.send("hello si ismail");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
