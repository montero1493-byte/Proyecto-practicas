import axios from "axios";
import type { Post } from "../types/post";

export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async (): Promise<Post[]> => {
    const response = await api.get<Post[]>("/posts");

    return response.data;
};