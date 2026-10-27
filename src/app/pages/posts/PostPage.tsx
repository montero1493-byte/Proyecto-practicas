import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPosts } from "../../store/PostSlice";
import { useState } from "react";
import type { Post } from "../../../types/post";
import {useNavigate} from "react-router-dom";

const PostsPage = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.posts.posts);

    const loading = useAppSelector((state) => state.posts.loading);

    const [search, setSearch] = useState("");

    //Paginacion
    const [page, setPage] = useState(1);

    const POSTS_PER_PAGE = 10;

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);


    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);


    if (loading) {
        return <p>Loading...</p>;
    };


    return (
        <>
            <header>
                <h1>Mantenimiento de Posts</h1>
            </header>

            <nav>
                inicio / Posts
            </nav>

            <div>
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); // Resetear a la primera página al cambiar la búsqueda
                }}
                placeholder="Buscar por título"
            />            
            </div>
            <br></br>

            <button onClick={() => navigate("/posts/create")}>Crear Nuevo Post</button>

            
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <button onClick={() => navigate(`/posts/detail/${post.id}`)}>Ver Detalle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <br></br>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
                </button>

                <span>Página {page} de {totalPages}</span>

                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Siguiente
                </button>
            </div>
        </>
    );
};

export default PostsPage;