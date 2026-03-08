import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    function closeMenu() {
        setOpen(false);
    }

    return (
        <header className="nav">
            <div className="nav__inner container">
                <NavLink to="/" className="nav__brand" onClick={closeMenu}>
                    {/* OJO: esto requiere public/logo.png */}
                    <img className="nav__logo" src="/logo.png" alt="Logo" />
                    <span className="nav__brandText">Centro Técnico Gabriela González</span>
                </NavLink>

                {/* Desktop links */}
                <nav className="nav__links nav__links--desktop">
                    <NavItem to="/" label="Inicio" onClick={closeMenu} />
                    <NavItem to="/cursos" label="Cursos" onClick={closeMenu} />
                    <NavItem to="/portafolio" label="Portafolio" onClick={closeMenu} />
                    <NavItem to="/info" label="Información" onClick={closeMenu} />
                </nav>

                {/* Mobile button */}
                <button
                    className="nav__menuBtn"
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="nav__burger" />
                </button>
            </div>

            {/* Mobile overlay + drawer */}
            {open && <button className="nav__overlay" type="button" onClick={closeMenu} aria-label="Cerrar menú" />}

            <div className={`nav__drawer ${open ? "isOpen" : ""}`}>
                <div className="nav__drawerHeader">
                    <span className="nav__drawerTitle">Menú</span>
                    <button className="nav__closeBtn" type="button" onClick={closeMenu} aria-label="Cerrar">
                        ✕
                    </button>
                </div>

                <nav className="nav__links nav__links--mobile">
                    <NavItem to="/" label="Inicio" onClick={closeMenu} />
                    <NavItem to="/cursos" label="Cursos" onClick={closeMenu} />
                    <NavItem to="/portafolio" label="Portafolio" onClick={closeMenu} />
                    <NavItem to="/info" label="Información" onClick={closeMenu} />
                </nav>
            </div>
        </header>
    );
}

function NavItem({ to, label, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `nav__link ${isActive ? "isActive" : ""}`}
        >
            {label}
        </NavLink>
    );
}