import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    zernioProfileId: {type: String}
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);