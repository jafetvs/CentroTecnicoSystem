import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { getCourses } from "../../services/courseService";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        categories: 0,
        courses: 0,
        galleryPhotos: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const [categoriesData, coursesData] = await Promise.all([
                    getCategories(1, 100),
                    getCourses(false),
                ]);

                const categories = categoriesData?.items || [];
                const courses = coursesData || [];

                const totalPhotos = categories.reduce((acc, item) => {
                    return acc + (item.photosCount || 0);
                }, 0);

                setStats({
                    categories: categories.length,
                    courses: courses.length,
                    galleryPhotos: totalPhotos,
                });
            } catch (err) {
                setError("No se pudieron cargar las estadísticas del panel.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return (
        <div className="adminPage">
            <section className="adminHeroCard">
                <div>
                    <p className="adminCardEyebrow">Resumen</p>
                    <h2>Gestiona el contenido del sitio</h2>
                    <p className="adminMutedText">
                        Desde aquí puedes administrar categorías, cursos,
                        galerías y el contenido visual del proyecto.
                    </p>
                </div>
            </section>

            {error && (
                <section className="adminPanelCard">
                    <p className="adminFormError">{error}</p>
                </section>
            )}

            <section className="adminStatsGrid">
                <article className="adminStatCard">
                    <span className="adminStatLabel">Categorías</span>
                    <strong className="adminStatValue">
                        {loading ? "..." : stats.categories}
                    </strong>
                    <p className="adminMutedText">
                        Categorías registradas en el portafolio.
                    </p>
                </article>

                <article className="adminStatCard">
                    <span className="adminStatLabel">Cursos</span>
                    <strong className="adminStatValue">
                        {loading ? "..." : stats.courses}
                    </strong>
                    <p className="adminMutedText">
                        Cursos creados en el sistema.
                    </p>
                </article>

                <article className="adminStatCard">
                    <span className="adminStatLabel">Galería</span>
                    <strong className="adminStatValue">
                        {loading ? "..." : stats.galleryPhotos}
                    </strong>
                    <p className="adminMutedText">
                        Total de fotos visibles en categorías.
                    </p>
                </article>
            </section>


        </div>
    );
}