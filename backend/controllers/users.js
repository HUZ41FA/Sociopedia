import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

export const getUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if(user){
            res.status(200).json(user._doc);
        }else{
            res.statusCode = 404;
            throw Error("User does not exists");
        }
})

export const getUserFriends = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
        ({_id, firstName, lastName, occupation, location, picturePath})=>{
            return {_id, firstName, lastName, occupation, location, picturePath}
        }
    )

    res.status(200).json(formattedFriends);
})

export const addRemoveFriend = asyncHandler(async (req, res) => {
    try{

        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
    
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter(id => id!== friendId);
            friend.friends = friend.friends.filter(id => id!== id);
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
    
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        )
    
        res.status(200).json(formattedFriends);
    }
    catch(err){
        console.log(err);
    }
});

