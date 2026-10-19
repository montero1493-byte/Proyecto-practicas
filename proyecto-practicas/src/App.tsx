import { useState } from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./app/store/hooks";
import { fetchPosts } from "./app/store/posts.slice";
import PostsPage from "./app/pages/posts/posts.page.tsx";
import './App.css'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return <PostsPage />;
}

export default App;
