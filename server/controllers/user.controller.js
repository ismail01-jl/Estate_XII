import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js"
export const test = (req, res) => {
    res.json({
        message: "user route and controller"
    })
}
export const updateuser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(402, 'You are not authorized to do that !!'))
    try {
        if (req.body.password) {
            req.user.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.name,
                email: req.body.email,
                password: req.body.password,
                imageUrl: req.body.imageUrl
            }

        }, { new: true })
        const { password, ...rest } = updatedUser._doc;
        res.status(202).json(rest)
    } catch (error) {
        next(error)
    }
}