import * as FileSystem from 'expo-file-system';
import {DB} from "../../db";
import {createAsyncThunk} from "@reduxjs/toolkit";

const {createSlice} = require("@reduxjs/toolkit");
const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true,
}

const addPostFetching = createAsyncThunk(
    'postSlice/addPostData',
    async (post) => {
        const fileName = post.img.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                to: newPath,
                from: post.img
            })
        } catch (e) {
            console.log('Error:', e)
        }
        const payload = {...post, img: newPath};
        payload.id = await DB.createPost(payload);
        return payload
    }
)

const loadFetching = createAsyncThunk(
    'postSlice/loadData',
    async () => {
        return DB.getPosts();
    }
)

const toggleBookedFetching = createAsyncThunk(
    'postSlice/toggle',
    async (post) => {
        await DB.updatePost(post);
        return post.id
    }
)

const removePostFetching = createAsyncThunk(
    'postSlice/removePostF',
    async (id) => {
        await DB.removePost(id);
        return id
    }
)


const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        // loadPosts: (state, action) => {
        //     state.loading = false;
        //     state.allPosts = action.payload;
        //     const bookedPosts = action.payload.filter(post => post?.booked);
        //     if (bookedPosts.length) {
        //         state.bookedPosts = bookedPosts
        //     }
        //
        // },
        // toggleBooked: (state, action) => {
        //     const allPosts = state.allPosts.map(post => {
        //         if (post.id === action.payload) {
        //             post.booked = !post.booked
        //         }
        //         return post
        //     })
        //     state.allPosts = allPosts
        //     state.bookedPosts = allPosts.filter(post => post.booked);
        // },
        // removePost: (state, action) => {
        //     state.allPosts = state.allPosts.filter(item => item.id !== action.payload);
        //     if (state.bookedPosts.length) {
        //         state.bookedPosts = state.bookedPosts.filter(item => item.id !== action.payload)
        //     }
        // },
        // addPost: (state, action) => {
        //     const id = Date.now().toString();
        //     state.allPosts.unshift({...action.payload, id})
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(loadFetching.fulfilled, (state, action) => {

            state.allPosts = action.payload;
            const bookedPosts = action.payload.filter(post => post?.booked);

            if (bookedPosts.length) {
                state.bookedPosts = bookedPosts
            }

            state.loading = false;
        })
        builder.addCase(addPostFetching.fulfilled, (state, action) => {
            state.allPosts.unshift(action.payload)
        })
        builder.addCase(toggleBookedFetching.fulfilled, (state, action) => {
            const allPosts = state.allPosts.map(post => {
                if (post.id === action.payload) {
                    post.booked = !post.booked
                }
                return post
            })
            state.allPosts = allPosts
            state.bookedPosts = allPosts.filter(post => post.booked);
        })
        builder.addCase(removePostFetching.fulfilled, (state, action) => {
            state.allPosts = state.allPosts.filter(item => item.id !== action.payload);
            if (state.bookedPosts.length) {
                state.bookedPosts = state.bookedPosts.filter(item => item?.id !== action.payload)
            }
        })

    }
})
const {reducer: postReducer, actions: {loadPosts, toggleBooked, removePost, addPost}} = postSlice
const postActions = {
    loadPosts,
    toggleBooked,
    removePost,
    addPost,
    loadFetching,
    addPostFetching,
    toggleBookedFetching,
    removePostFetching
}

export {
    postReducer,
    postActions
}