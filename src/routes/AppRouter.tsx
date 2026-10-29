import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import HomePage from "../app/pages/home/HomePage";
import PostsPage from "../app/pages/posts/PostPage";
import CreatePostPage from "../app/pages/posts/CreatePostPage";
import PostDetailPage from "../app/pages/posts/PostDetailPage";
import LoginPage from "../app/pages/auth/LoginPage";
import RegisterPage from "../app/pages/auth/RegisterPage";
import ProfilePage from "../app/pages/profile/ProfilePage";
import DashboardPage from "../app/pages/dashboard/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";

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
                        element={<ProtectedRoute>
                            <PostsPage />
                            </ProtectedRoute>}
                    />

                    <Route
                        path="/posts/create"
                        element={<ProtectedRoute>
                            <CreatePostPage />
                            </ProtectedRoute>}
                    />

                    <Route
                        path="/posts/detail/:id"
                        element={<ProtectedRoute>
                            <PostDetailPage />
                            </ProtectedRoute>}
                    />

                    <Route
                        path="/profile"
                        element={<ProtectedRoute>
                            <ProfilePage />
                            </ProtectedRoute>}
                    />

                    <Route
                        path="/dashboard"
                        element={<ProtectedRoute>
                            <DashboardPage />
                            </ProtectedRoute>}
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