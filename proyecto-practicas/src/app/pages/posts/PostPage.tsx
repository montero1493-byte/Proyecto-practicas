import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPosts } from "../../store/PostSlice";
import { useState } from "react";
import type { Post } from "../../../types/post";

const PostsPage = () => {
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

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleEdit = (post: Post) => {
        setEditingPostId(post.id);
        setTitle(post.title);
        setBody(post.body);
    };

    const handleDelete = (id: number) => {
        // Aquí puedes implementar la lógica para eliminar un post
        console.log(`Eliminar post con ID: ${id}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !body.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (editingPostId) {
            // Aquí puedes implementar la lógica para actualizar un post
            console.log(`Actualizar post con ID: ${editingPostId}`);
        } else {
            // Aquí puedes implementar la lógica para crear un nuevo post
            console.log("Crear nuevo post");
        }

        setTitle("");
        setBody("");
        setEditingPostId(null);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

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
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
            </button>

            <span>Página {page} de {totalPages}</span>

            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Siguiente
            </button>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Contenido"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Guardar</button>

                {editingPostId && (
                    <button type="button" onClick={() => {
                        setEditingPostId(null);
                        setTitle("");
                        setBody("");
                    }}>
                      Cancelar
                      </button>
                )}
            </form>
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
                                            <button onClick={() => handleEdit(post)}>Editar</button>
                                            <button onClick={() => handleDelete(post.id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        </>
    );
};

export default PostsPage;