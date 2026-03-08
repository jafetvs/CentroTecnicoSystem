import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
    return (
        <section className="home3d">
            <div className="home3d__container">
                {/* HERO */}
                <header className="home3d__hero">
                    <div className="home3d__brandRow">
                        <img className="home3d__logo" src="/logo.png" alt="Logo" />
                        <div className="home3d__brandText">Centro Técnico</div>
                    </div>

                    <h1 className="home3d__title">
                        Gabriela <span>González</span>
                    </h1>

                    <p className="home3d__subtitle">
                        EL CONOCIMIENTO ES PODER
                    </p>

                    <div className="home3d__actions">
                        <Link className="hbtn hbtn--gold" to="/portafolio">
                            Ver portafolio
                        </Link>
                        <Link className="hbtn hbtn--dark" to="/info">
                            Contacto
                        </Link>
                    </div>
                </header>

                {/* SERVICIOS (3 cards) */}
                <section className="home3d__section">
                    <div className="home3d__sectionHead">
                        <h2 className="home3d__h2">Servicios</h2>
                        <div className="home3d__line" />
                    </div>

                    <div className="home3d__grid">
                        <div className="hcard">
                            <div className="hcard__top">
                                <div className="hcard__icon">✨</div>
                                <div className="hcard__title">Membresias</div>
                            </div>
                            <p className="hcard__text">
                                Resultados elegantes, prolijos y duraderos.
                            </p>
                        </div>

                        <div className="hcard">
                            <div className="hcard__top">
                                <div className="hcard__icon">🖼️</div>
                                <div className="hcard__title">Galería por categorías</div>
                            </div>
                            <p className="hcard__text">
                                Explora trabajos reales y detalles por estilo.
                            </p>
                        </div>

                        <div className="hcard">
                            <div className="hcard__top">
                                <div className="hcard__icon">🎓</div>
                                <div className="hcard__title">Cursos</div>
                            </div>
                            <p className="hcard__text">
                                Aprende con una guía clara y práctica.
                            </p>

                            <Link className="hcard__link" to="/cursos">Ver cursos →</Link>
                        </div>
                    </div>
                </section>

                {/* CTA FINAL */}
                <section className="home3d__cta">
                    <div className="home3d__ctaCard">
                        <h3 className="home3d__ctaTitle">¿Lista para empezar?</h3>
                        <p className="home3d__ctaText">
                            Escríbenos y te guiamos según lo que necesitas.
                        </p>
                        <Link className="hbtn hbtn--gold" to="/info">
                            Contactar
                        </Link>
                    </div>
                </section>
            </div>
        </section>
    );
}