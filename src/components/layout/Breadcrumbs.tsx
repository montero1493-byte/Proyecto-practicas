import { useLocation } from "react-router-dom";

const prueba = 1

export const Breadcrumbs = () => {
    const location = useLocation();

    const paths = location.pathname.split("/").filter(Boolean);

    return (
        <div>
            {paths.length === 0
                ? <span>Home</span>
                : paths.join(" / ")}
        </div>
    );
};

export default Breadcrumbs;