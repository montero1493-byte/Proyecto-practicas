import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../../types/post";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface PostsState {
    posts: Post[];
    loading: boolean;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
};

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {

        console.log("FETCHING POSTS..."); //log de prueba

        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return response.data;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
            });
    },
});



export default postsSlice.reducer;