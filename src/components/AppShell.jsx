import { NavLink } from "react-router-dom";

export default function AppShell({ children }) {
    return (
        <div className="app">
            <header className="topbar">
                <div className="topbarInner">
                    <div className="brand">
                        <div className="logo">POS</div>
                        <div>
                            <div className="brandTitle">Sales Dashboard</div>

                        </div>
                    </div>

                    <nav className="nav">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/journal"
                            className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
                        >
                            Sales Journal
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="container">{children}</main>

            <footer className="footer">
                <span>POS • React + Vite</span>
            </footer>
        </div>
    );
}