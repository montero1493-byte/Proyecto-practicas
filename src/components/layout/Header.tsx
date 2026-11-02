import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../app/store/hooks/theme";

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {theme, setTheme} = useTheme();

    if (location.pathname === "/") {
        return null;
    }

    const handleuLogout = (): void => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userType");

        navigate("/");
    };

    return (
        <>
            <header className="app-header">
                <nav className="app-headerNav">
                    <Link to="/">Home</Link>
                    {" | "}
                    <Link to="/posts">Posts</Link>
                    {" | "}
                    <Link to="/dashboard">Dashboard</Link>
                    {" | "}
                    <Link to="/profile">Perfil</Link>
                </nav>

                <button className="theme-button"
                    onClick={() =>
                        setTheme(
                            theme === "dark"
                                ? "light"
                                : "dark"
                        )
                    }
                >
                    {theme === "dark"
                        ? "☀️"
                        : "🌙"}
                </button>    

                <button className="logout-link" onClick={handleuLogout}>
                    Cerrar Sesion
                </button>
            </header>
        </>
    );
};

export default Header;