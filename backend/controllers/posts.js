import Post from "../models/postModel.js";
import asyncHandler from 'express-async-handler';

export const createPost = asyncHandler(async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);

    } catch (err) {
        console.log(err);
    }
});


export const getFeedPosts = asyncHandler(async (req, res) => {
    try {
        const post = await post.find();
        req.status(200).json(post);
    } catch (err) {
        console.log(err);
    }
});


export const getUserPosts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await post.find({userId:userId});
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
    }
});


export const likePost = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes},
            { new: true}, 
            );

        res.status(200).json(updatedPost);

    }catch{ 
        console.log(err);
    }
})