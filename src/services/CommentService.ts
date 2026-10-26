import axios from "axios";

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

export const getComments = async () => {
    const response = await axios.get(COMMENTS_URL);

    return response.data;
};