import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/hooks";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { updatePost, deletePost } from "../../store/PostSlice";
import { useEffect } from "react";
import { useToast } from "../../store/hooks/useToast";
import Toast from "../../../components/toast/Toast"


const PostDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {message, showToast} = useToast();

  const post = useAppSelector((state) => state.posts.posts.find((post) => post.id === Number(id)));

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


useEffect(() => {
  if (post) {
    setTitle(post.title);
    setBody(post.body);
  }
}, [post]);

if (!post) {
    return <p>Post no encontrado</p>;
};


const handleSave = () => {
  dispatch(updatePost({ userId: post.userId, id: post.id, title, body }));
  setIsEditing(false);

  if (!title.trim() || !body.trim()) {
      alert("completa todos los campos");
      return;
    }

  showToast("Post Actualizado");
};


const handleDelete = () => {
  const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este post?");
  if (!confirmDelete) {
    return;
  }
  dispatch(deletePost(post.id));


  navigate("/posts", {
    state: {
      successMessage: "Post eliminado",
    },
  });
};

  return (
    <>
      {message && (<Toast message={message} />
      )}
    
    <div>
        <h1>Detalles</h1>
        <p>ID: {id}</p>

          {!isEditing ? (
      <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
      </div>
          ) : (
      <div>
          <h2>Editar Post</h2>
          <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={() => handleSave()}>Guardar</button>
      </div>
)}
    </div>
  </>
  );
};




export default PostDetailPage;