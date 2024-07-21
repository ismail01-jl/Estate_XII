import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js"
export const test = (req, res) => {
    res.json({
        message: "user route and controller"
    })
}
export const updateuser = async (req, res, next) => {
    //if (req.user.id !== req.params.id) return next(errorHandler(401, 'You are not authorized to do that !!'));

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.usernamee,
                email: req.body.email,
                password: req.body.password,
                imageUrl: req.body.imageUrl
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(202).json(rest);
    } catch (error) {
        next(error);
    }
};
export const deleteuser = async (req, res, next) => {
    //if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your account  !!'));
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('user has been deleted')
    }
    catch (error) {
        next(error)
    }
}