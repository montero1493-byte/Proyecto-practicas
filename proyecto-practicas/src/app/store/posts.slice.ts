import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../../types/post";

interface PostsState {
    posts: Post[];
    loading: boolean;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setPosts, setLoading } = postsSlice.actions;

export default postsSlice.reducer;