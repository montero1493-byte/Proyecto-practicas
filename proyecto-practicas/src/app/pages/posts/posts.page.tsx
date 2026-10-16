import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPosts } from "../../store/posts.slice";
import { getPosts } from "../../services/post.service";

const PostsPage = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.posts.posts);

    useEffect(() => {
        getPosts().then((data) => {
            dispatch(setPosts(data));
        });
    }, [dispatch]);

    return (
        <div>
            <h1>Posts</h1>

            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsPage;