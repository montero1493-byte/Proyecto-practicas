import {useState} from 'react';
import { useAppDispatch } from "../../store/hooks";
import { createPost } from "../../store/PostSlice";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setContent] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("completa todos los campos");
      return;
    }

    await dispatch(createPost({ title, body: body, userId: 1 }));

    dispatch({ type: "posts/setSuccessMessage", payload: "Post creado exitosamente" });
    navigate("/posts");
  };

  return (
    <>
      <h1>Nuevo Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Contenido</label>

          <textarea
          value={body}
          onChange={(e) => setContent(e.target.value)}
          />

        </div>
        <button type="submit">Crear Post</button>
      </form>
    </>
  );
};

export default CreatePostPage;