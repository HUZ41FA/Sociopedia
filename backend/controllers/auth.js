import brcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

//? REGISTER USER
export const register = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
    } = req.body;

    const salt = await brcrypt.genSalt(16);
    const passwordHash = await brcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        impressions: Math.floor(Math.random()) * 1000,
        impressions: Math.floor(Math.random()) * 1000

    });

    const { _doc } = await newUser.save();

    return res.status(201).json({ user: newUser, password: null });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const isMatch = await brcrypt.compare(password, user?.password);

    if (user == null || !isMatch) {
        throw Error("Please enter a valid email or password");
    } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.status(200).json({
            user: user,
            token: token
        });
    }
})