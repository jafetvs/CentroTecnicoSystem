import { useEffect, useState } from "react";
import {
    getCourses,
    deleteCourse,
    getCourseById,
} from "../../services/courseService";
import CourseFormModal from "../../components/admin/CourseFormModal";

export default function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

    async function loadCourses() {
        try {
            setLoading(true);
            setError("");
            const data = await getCourses(false);
            setCourses(data || []);
        } catch (err) {
            setError("No se pudieron cargar los cursos.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCourses();
    }, []);

    async function handleViewDetail(id) {
        try {
            setDetailLoading(true);
            const data = await getCourseById(id);
            setSelectedCourse(data);
        } catch (err) {
            alert("No se pudo cargar el detalle del curso.");
        } finally {
            setDetailLoading(false);
        }
    }

    async function handleDelete(id) {
        const ok = window.confirm("¿Seguro que deseas eliminar este curso?");
        if (!ok) return;

        try {
            await deleteCourse(id);
            await loadCourses();

            if (selectedCourse?.id === id) {
                setSelectedCourse(null);
            }
        } catch (err) {
            alert("No se pudo eliminar el curso.");
        }
    }

    function handleOpenEdit(course) {
        setCourseToEdit(course);
        setIsEditModalOpen(true);
    }

    async function handleSaved() {
        await loadCourses();

        if (selectedCourse?.id) {
            await handleViewDetail(selectedCourse.id);
        }
    }

    return (
        <div className="adminPage">
            <div className="adminSectionHeader">
                <div>
                    <p className="adminCardEyebrow">Módulo</p>
                    <h2>Cursos</h2>
                </div>

                <button
                    className="adminPrimaryBtn"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Nuevo curso
                </button>
            </div>

            {loading && (
                <div className="adminPanelCard">
                    <p className="adminMutedText">Cargando cursos...</p>
                </div>
            )}

            {error && (
                <div className="adminPanelCard">
                    <p className="adminMutedText">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="adminCategoriesGrid">
                    <div className="adminPanelCard">
                        <h3>Listado</h3>

                        {courses.length === 0 ? (
                            <p className="adminMutedText">No hay cursos registrados.</p>
                        ) : (
                            <div className="adminTableWrap">
                                <table className="adminTable">
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Nivel</th>
                                            <th>Duración</th>
                                            <th>Precio</th>
                                            <th>Activo</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course) => (
                                            <tr key={course.id}>
                                                <td>{course.title}</td>
                                                <td>{course.level || "-"}</td>
                                                <td>{course.duration || "-"}</td>
                                                <td>{course.price || "-"}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            course.isActive
                                                                ? "adminBadge active"
                                                                : "adminBadge inactive"
                                                        }
                                                    >
                                                        {course.isActive ? "Sí" : "No"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="adminActions">
                                                        <button
                                                            className="adminActionBtn"
                                                            onClick={() => handleViewDetail(course.id)}
                                                        >
                                                            Ver
                                                        </button>

                                                        <button
                                                            className="adminActionBtn"
                                                            onClick={() => handleOpenEdit(course)}
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            className="adminActionBtn danger"
                                                            onClick={() => handleDelete(course.id)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="adminPanelCard">
                        <h3>Detalle</h3>

                        {detailLoading ? (
                            <p className="adminMutedText">Cargando detalle...</p>
                        ) : !selectedCourse ? (
                            <p className="adminMutedText">
                                Selecciona un curso para ver su información.
                            </p>
                        ) : (
                            <div className="adminCategoryDetail">
                                <h4>{selectedCourse.title}</h4>

                                <p className="adminMutedText">
                                    <strong>Nivel:</strong> {selectedCourse.level || "No definido"}
                                </p>

                                <p className="adminMutedText">
                                    <strong>Duración:</strong> {selectedCourse.duration || "No definida"}
                                </p>

                                <p className="adminMutedText">
                                    <strong>Precio:</strong> {selectedCourse.price || "No definido"}
                                </p>

                                <p className="adminMutedText">
                                    <strong>Estado:</strong>{" "}
                                    {selectedCourse.isActive ? "Activo" : "Inactivo"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <CourseFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSaved={handleSaved}
            />

            <CourseFormModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setCourseToEdit(null);
                }}
                onSaved={handleSaved}
                editMode={true}
                initialData={courseToEdit}
            />
        </div>
    );
}