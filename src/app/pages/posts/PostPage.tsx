import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { fetchPosts } from "../../store/PostSlice";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Toast from "../../../components/toast/Toast"


const POSTS_PER_PAGE = 10;
const TOAST_DURATION = 3000;

const PostsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isGuest = localStorage.getItem("userType") === "guest";

    const posts = useAppSelector((state) => state.posts.posts);

    const loading = useAppSelector((state) => state.posts.loading);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const showSuccessMessage = (
        message: string
    ): void => {
        setSuccessMessage(message);
    };


    useEffect(() => {
        if (location.state?.successMessage) {
            showSuccessMessage(location.state.successMessage);
        }
    }, [location.state]);

    useEffect(() => {
        if (!successMessage) {
            return;
        }

        const timer = setTimeout(() => {
            setSuccessMessage(null);
        }, TOAST_DURATION);

        return () => clearTimeout(timer);
    }, [successMessage]);

    //Paginacion
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
            {successMessage && (<Toast message={successMessage} />
)}
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

            {!isGuest && (
            <button onClick={() => navigate("/posts/create")}>Crear Nuevo Post</button>
            )}

            
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