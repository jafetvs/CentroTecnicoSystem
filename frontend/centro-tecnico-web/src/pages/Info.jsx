import { Link } from "react-router-dom";
import "../styles/info.css";

export default function Info() {
    return (
        <section className="page">
            <div className="container">
                <div className="page__head">
                    <h2 className="page__title">Información & Contacto</h2>
                    <p className="page__sub">
                        Comunícate con nosotros o conoce más sobre nuestro centro de formación.
                    </p>
                </div>

                <div className="infoGrid">

                    {/* CONTACTO */}
                    <div className="infoCard">
                        <h3 className="cardTitle">Contacto</h3>
                        <div className="divider" />

                        <div className="infoList">
                            <Row label="WhatsApp" value="+58 424 806 5506" />
                            <Row label="Instagram" value="@gabrielagonzalez1106" />
                            <Row label="Ubicación" value="Venezuela" />
                            <Row label="Horario" value="Lunes a viernes • 9:00 am – 9:00 pm" />
                        </div>

                        <a
                            className="btnPrimary"
                            href="https://wa.me/584248065506?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Solicitar información por WhatsApp
                        </a>
                    </div>

                    {/* SOBRE EL CENTRO */}
                    <div className="infoCard">
                        <h3 className="cardTitle">Sobre el Centro</h3>
                        <div className="divider" />

                        <p className="mutedText">
                            Centro Técnico Gabriela González es un espacio dedicado a la formación
                            profesional en el área de la belleza y el cuidado de uñas. Nuestro
                            objetivo es capacitar a estudiantes y profesionales con técnicas
                            modernas, materiales de calidad y conocimientos actualizados para
                            desarrollar habilidades reales dentro de la industria.

                            <br /><br />

                            Ofrecemos programas de capacitación diseñados para que cada estudiante
                            pueda avanzar desde un nivel básico hasta técnicas avanzadas,
                            permitiendo construir una formación sólida y profesional dentro del
                            mundo de la estética.

                            <br /><br />

                            Nuestro enfoque combina práctica, creatividad y aprendizaje técnico
                            para que cada alumno pueda aplicar lo aprendido tanto en el ámbito
                            profesional como en su propio emprendimiento.

                            <br /><br />

                            Las capacitaciones pueden realizarse de manera presencial o virtual,
                            brindando la posibilidad de formación a estudiantes dentro y fuera del
                            país. Nuestro compromiso es formar profesionales preparados para
                            destacar en la industria de la belleza a nivel nacional e
                            internacional.
                        </p>

                        <div className="note">
                            <div className="note__title">Estilo de marca</div>
                            <div className="note__sub">
                                Elegancia • Profesionalismo • Formación de alto nivel
                            </div>
                        </div>

                        <Link className="btnLineWide" to="/portafolio">
                            Ver portafolio
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

function Row({ label, value }) {
    return (
        <div className="infoRow">
            <span className="infoLabel">{label}</span>
            <span className="infoValue">{value}</span>
        </div>
    );
}