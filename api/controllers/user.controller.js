import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({ message: 'Testing route...' });
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));
    try { //if user is updating password,hash the password
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('Account deleted!');
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req,res,next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only view your own listings!'));

    try {
        const listings = await Listing.find({ userRef: req.params.id }); // only find those that have that id
        res.status(200).json(listings);                                 //userRef contain the id same as of user id.
    } catch (error) {             //if multiple listings are created by a user,all the userRef field will have same id, 
        next(error);                //that is id of user 
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'user not found'));

        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}