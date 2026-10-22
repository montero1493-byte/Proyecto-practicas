import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../../types/post";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    successMessage: null,
};

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {

        console.log("FETCHING POSTS...");

        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return response.data;
    }
);

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (newPost: Omit<Post, "id">) => {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
        return response.data;
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (updatedPost: Post) => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
        return response.data;
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id: number) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return id;
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
            })
            .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});

export default postsSlice.reducer;