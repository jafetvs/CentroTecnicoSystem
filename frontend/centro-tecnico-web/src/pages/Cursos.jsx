import { useEffect, useState } from "react";
import { getPublicCourses } from "../services/publicService";
import "../styles/cursos.css";

export default function Cursos() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCourses() {
            try {
                setLoading(true);
                setError("");

                const data = await getPublicCourses();
                setCourses(data || []);

            } catch (err) {
                setError("No se pudieron cargar los cursos.");
            } finally {
                setLoading(false);
            }
        }

        loadCourses();
    }, []);

    function buildWhatsAppLink(course) {

        const message = `Hola, quiero información sobre el curso "${course.title}" (${course.level || "nivel por definir"}).`;

        return `https://wa.me/584248065506?text=${encodeURIComponent(message)}`;
    }

    return (
        <section className="page">
            <div className="container">

                <div className="page__head">
                    <h2 className="page__title">Cursos</h2>

                    <p className="page__sub">
                        Formación práctica y profesional disponible actualmente.
                    </p>
                </div>

                {loading && (
                    <div className="coursesState">
                        <p>Cargando cursos...</p>
                    </div>
                )}

                {error && (
                    <div className="coursesState coursesState--error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <div className="coursesState">
                        <p>No hay cursos activos disponibles en este momento.</p>
                    </div>
                )}

                {!loading && !error && courses.length > 0 && (

                    <div className="coursesGrid">

                        {courses.map((c) => (

                            <article key={c.id} className="courseCard">

                                <div className="courseTop">

                                    <span className="badge">
                                        {c.level || "Curso"}
                                    </span>

                                    <span className="mutedSmall">
                                        {c.duration || "Duración por definir"}
                                    </span>

                                </div>

                                <h3 className="courseTitle">
                                    {c.title}
                                </h3>

                                <div className="divider" />

                                <div className="rowBetween">

                                    <span className="mutedSmall">
                                        Precio
                                    </span>

                                    <span className="price">
                                        {c.price || "Consultar"}
                                    </span>

                                </div>

                                

                                <div className="rowBetween">

                                <a
                                    className="btnLine"
                                    href={buildWhatsAppLink(c)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Solicitar info
                                    </a>
                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </div>
        </section>
    );
}