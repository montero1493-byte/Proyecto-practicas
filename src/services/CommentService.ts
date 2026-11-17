import { api } from "./Api";

export const getComments = async () => {
    const response = await api.get("/comments");

    return response.data;
};