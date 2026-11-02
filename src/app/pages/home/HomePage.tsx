import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <h1>{t("homepage.title")}</h1>

            <form className="login-form" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username">
                  {t("homepage.user")}
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
                  {t("homepage.password")}
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
                  {t("homepage.login")}
                </button>

                <button className="app-button" type="button"
                onClick={handleGuestLogin}>
                  {t("homepage.guest")}
                </button>
              </div>

            </form>

            
        </div>
      </div>
    </>
  );
};

export default HomePage;