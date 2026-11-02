import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../app/store/hooks/theme";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./languageSelector";

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {theme, setTheme} = useTheme();
    const { t } = useTranslation();

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
                    <Link to="/">{t("app.home")}</Link>
                    {" | "}
                    <Link to="/posts">Posts</Link>
                    {" | "}
                    <Link to="/dashboard">{t("app.dashboard")}</Link>
                    {" | "}
                    <Link to="/profile">{t("app.profile")}</Link>
                </nav>

                <div className="header-actions">
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

                    <LanguageSelector />    

                    <button className="logout-link" onClick={handleuLogout}>
                        {t("app.logout")}
                    </button>
                </div>

            </header>
        </>
    );
};

export default Header;