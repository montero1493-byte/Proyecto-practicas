import {useState} from 'react';
import { useAppDispatch } from "../../store/hooks/hooks";
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


    navigate("/posts", {state: {successMessage: "Post creado"}});
  };

  return (
    <div className='create-post-page'>
      <div className='create-post-card'>
      <h1>Nuevo Post</h1>

      <form className='create-post-form' onSubmit={handleSubmit}>
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
        <button className='app-button' type="submit">Crear Post</button>
      </form>
      </div>
    </div>
  );
};

export default CreatePostPage;