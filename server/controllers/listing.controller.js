import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
}
export const getListings = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user._id !== listing.userRef) {
        return next(errorHandler(401, "You are not authorized to update this listing"));
    }
    try {
        const UpdatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(UpdatedListing)
    } catch (error) {
        next(error)
    }
}
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user._id !== listing.userRef) {
        return next(errorHandler(401, "You are not authorized to delete this listing"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        next(error)
    }
}
