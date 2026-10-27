import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!username.trim() || !password.trim()) {
      alert("completa todos los campos");
      return;
    }

      localStorage.setItem(
        "isAuthenticated",
        "true");

      localStorage.setItem(
        "userType",
        "registered");

      navigate("/posts");
    };

  const handleGuestLogin = () => {
    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    localStorage.setItem(
      "userType",
      "guest"
    );

    navigate("/posts");
  };
  
  return (
    <>
        <h1>Bienvenido</h1>

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">
              Usuario
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)}/>
          </div>

          <button type="submit">
            Iniciar sesión
          </button>
        </form>

        <button type="button"
          onClick={handleGuestLogin}>
            Entrar como invitado
        </button>
    </>
  );
};

export default HomePage;