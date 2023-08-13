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

    password: {
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
    viewedProfile: {
        type: Number,
        default: Math.floor(Math.random() * 1000)
    },
    impressions: {
        type: Number,
        default: Math.floor(Math.random() * 1000)
    },
}, { timestamps: true })


const User = mongoose.model('user', userSchema);

export default User;