import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Breadcrumbs} from "./Breadcrumbs";

const MainLayout = () => {
    return (
        <>
            <Header />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;