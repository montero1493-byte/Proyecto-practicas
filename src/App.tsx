import { useState } from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./app/store/hooks.ts";
import { fetchPosts } from "./app/store/PostSlice.ts";
import PostsPage from "./app/pages/posts/PostPage.tsx";
import './App.css'
import AppRouter from './routes/AppRouter.tsx';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
