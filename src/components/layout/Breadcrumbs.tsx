import { useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
    const location = useLocation();

    const paths = location.pathname.split("/").filter(Boolean);

    return (
        <div>
            {paths.length === 0
                ? "Home"
                : `Home / ${paths.join(" / ")}`}
        </div>
    );
};

export default Breadcrumbs;