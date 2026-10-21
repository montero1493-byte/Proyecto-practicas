import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import HomePage from "../app/pages/home/HomePage";
import PostsPage from "../app/pages/posts/PostPage";
import CreatePostPage from "../app/pages/posts/CreatePostPage";
import EditPostPage from "../app/pages/posts/EditPostPage";
import LoginPage from "../app/pages/auth/LoginPage";
import RegisterPage from "../app/pages/auth/RegisterPage";
import ProfilePage from "../app/pages/profile/ProfilePage";
import DashboardPage from "../app/pages/dashboard/DashboardPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/posts"
                        element={<PostsPage />}
                    />

                    <Route
                        path="/posts/create"
                        element={<CreatePostPage />}
                    />

                    <Route
                        path="/posts/edit/:id"
                        element={<EditPostPage />}
                    />

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />
                </Route>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;