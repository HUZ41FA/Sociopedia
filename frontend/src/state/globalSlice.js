import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false,
    user: null,
    token: null,
    posts: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                } else {
                    return post;
                }
            })
            state.posts = updatedPosts;
        }

    }
})

export const {
    setMode,
    setLogout,
    setLogin,
    setFriends,
    setPost,
    setPosts
} = authSlice.actions;
export default authSlice.reducer;