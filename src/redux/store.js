import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {postReducer} from "./reducers-slices/postSlice";

const rootReducer = combineReducers({post: postReducer });
export const store = configureStore({
    reducer: rootReducer
})