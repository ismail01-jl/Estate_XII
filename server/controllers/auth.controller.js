import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newuser = new User({ username, email, password: hashedPassword });
    try {
        await newuser.save();
        res.status(201).json("newuser created succsessfully");
    } catch (error) {
        next(error);
    }
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return next(errorHandler(404, 'user not found!!'))
        const validpassword = bcryptjs.compareSync(password, user.password);
        if (!validpassword) return next(errorHandler(405, 'check password or email !!'));
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const {password: pass , ...rest} = user._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } catch (error) {
        next(error)
    }
}