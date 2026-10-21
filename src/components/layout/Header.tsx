import { Link } from "react-router-dom";


const prueba = 1

export const Header = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            {" | "}
            <Link to="/posts">Posts</Link>
            {" | "}
            <Link to="/dashboard">Dashboard</Link>
            {" | "}
            <Link to="/profile">Perfil</Link>
        </nav>
    );
};

export default Header;