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

        console.log("FETCHING POSTS...");

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
            })

            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (newPost: Omit<Post, "id">) => {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
        return response.data;
    }
);

export default postsSlice.reducer;