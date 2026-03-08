import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";

export default function AdminSidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        removeToken();
        navigate("/login");
    }

    return (
        <aside className="adminSidebar">
            <div>
                <div className="adminBrand">
                    <div className="adminBrandLogo">CT</div>
                    <div>
                        <h2>Centro Técnico</h2>
                        <span>Admin Panel</span>
                    </div>
                </div>

                <nav className="adminNav">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            isActive ? "adminNavLink active" : "adminNavLink"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/categories"
                        className={({ isActive }) =>
                            isActive ? "adminNavLink active" : "adminNavLink"
                        }
                    >
                        Categorías
                    </NavLink>

                    <NavLink
                        to="/admin/courses"
                        className={({ isActive }) =>
                            isActive ? "adminNavLink active" : "adminNavLink"
                        }
                    >
                        Cursos
                    </NavLink>
                </nav>
            </div>

            <div className="adminSidebarFooter">
                <button className="adminLogoutBtn" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}