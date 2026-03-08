import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";
import { saveToken } from "../utils/auth";
import "../styles/LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginAdmin(form);
            saveToken(response.token);
            navigate("/admin");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "No se pudo iniciar sesión."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="loginPage">
            <div className="loginOverlay"></div>

            <div className="loginContainer">
                <div className="loginBrand">
                    <span className="loginBadge">Panel Admin</span>
                    <h1>Centro Técnico</h1>
                    <p>
                        Accede al panel para gestionar categorías, galería,
                        cursos y el contenido del sitio.
                    </p>
                </div>

                <div className="loginCard">
                    <div className="loginCardHeader">
                        <h2>Iniciar sesión</h2>
                        <p>Ingresa tus credenciales para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit} className="loginForm">
                        <div className="loginField">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="admin@correo.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="loginField">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <div className="loginError">{error}</div>}

                        <button
                            type="submit"
                            className="loginButton"
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Entrar al panel"}
                        </button>
                    </form>

                    <div className="loginFooterText">
                        <span>Acceso restringido solo para administración.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}