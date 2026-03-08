import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../utils/auth";

export default function AdminLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogout() {
        logout();
        window.location.href = "/login";
    }

    return (
        <div className="adminShell">

            {/* BOTON MOVIL */}
            <button
                className="adminMenuToggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* SIDEBAR */}
            <aside className={`adminSidebar ${menuOpen ? "open" : ""}`}>
                <div>

                    <div className="adminBrand">
                        <div className="adminBrandLogo">CT</div>
                        <div>
                            <h2>Centro Técnico</h2>
                            <span>Panel Admin</span>
                        </div>
                    </div>

                    <nav className="adminNav">

                        <NavLink
                            to="/admin"
                            end
                            className="adminNavLink"
                            onClick={() => setMenuOpen(false)}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/categories"
                            className="adminNavLink"
                            onClick={() => setMenuOpen(false)}
                        >
                            Categorías
                        </NavLink>

                        <NavLink
                            to="/admin/courses"
                            className="adminNavLink"
                            onClick={() => setMenuOpen(false)}
                        >
                            Cursos
                        </NavLink>

                    </nav>
                </div>

                <div className="adminSidebarFooter">
                    <button
                        className="adminLogoutBtn"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* CONTENIDO */}
            <main className="adminMainArea">
                <Outlet />
            </main>

        </div>
    );
}