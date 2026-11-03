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

      localStorage.setItem(
        "username",
        username);

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
      <div className="login-page">
        <div className="login-card">
            <h1>Bienvenido</h1>

            <form className="login-form" onSubmit={handleLogin}>
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

              <div className="login-button ">
                <button className="app-button" type="submit">
                  Iniciar sesión
                </button>

                <button className="app-button" type="button"
                onClick={handleGuestLogin}>
                  Entrar como invitado
                </button>
              </div>

            </form>

            
        </div>
      </div>
    </>
  );
};

export default HomePage;