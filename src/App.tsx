import { useEffect } from "react";
import { useAppDispatch } from "./app/store/hooks/hooks.ts";
import { fetchPosts } from "./app/store/PostSlice.ts";
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
