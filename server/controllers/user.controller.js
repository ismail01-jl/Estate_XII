import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';
export const test = (req, res) => {
    res.json({
        message: "user route and controller"
    })
}
export const getUserListings = async (req, res, next) => {
    //console.log("req.user._id:", req.user.id);
    //console.log("req.params.id:", req.params.id);
    if (req.user._id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id })
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
    }
}
export const updateuser = async (req, res, next) => {
    if (req.user._id !== req.params.id) return next(errorHandler(401, 'You are not authorized to do that !!'));

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
    if (req.user._id !== req.params.id) return next(errorHandler(401, 'You can only delete your account  !!'));
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('user has been deleted')
    }
    catch (error) {
        next(error)
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found'));
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }

}