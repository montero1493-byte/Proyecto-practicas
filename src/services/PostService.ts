import type { Post } from "../types/post";
import { api } from "./Api";

export const getPosts = async (): Promise<Post[]> => {
    const response = await api.get<Post[]>("/posts");

    return response.data;
};