import { Link } from "react-router";

function Navigation() {
    return (
        <nav className="sidebar">
            <h2>Data Dash</h2>
            <ul>
                <li>
                    {/* The 'to' prop is where the link takes you! */}
                    <Link to="/">🏠 Dashboard Home</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
