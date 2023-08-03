import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },

    lastName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },

    email: {
        type: String,
        require: true,
        min: 2,
        max: 50,
        unique: true,
    },

    email: {
        type: String,
        require: true,
        min: 8,
        max: 50,
    },

    picturePath: {
        type: String,
        default: "",
    },

    friends: {
        type: Array,
        default: [],
    },

    location: String,
    viewedProfile: Number,
    impressions: Number,
}, {timestamps: true})


const User = mongoose.Model('user', userSchema);

export default User;