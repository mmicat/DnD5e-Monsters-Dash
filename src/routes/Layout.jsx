import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

function Layout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
}

export default Layout;