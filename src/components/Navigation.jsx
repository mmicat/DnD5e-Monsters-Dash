import { Link } from "react-router";

function Navigation() {
    return (
        <nav className="sidebar" style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px 30px', backgroundColor: 'var(--card-bg)', borderBottom: '2px solid var(--border-color)' }}>
            <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-dark)', textDecoration: 'none' }}>
                🏠 Dashboard Home
            </Link>
        </nav>
    );
}

export default Navigation;
