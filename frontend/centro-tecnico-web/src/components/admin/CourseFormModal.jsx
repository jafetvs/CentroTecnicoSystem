import { useEffect, useState } from "react";
import { createCourse, updateCourse } from "../../services/courseService";

const initialForm = {
    title: "",
    level: "",
    duration: "",
    price: "",
    isActive: true,
};

export default function CourseFormModal({
    isOpen,
    onClose,
    onSaved,
    editMode = false,
    initialData = null,
}) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            if (editMode && initialData) {
                setForm({
                    title: initialData.title || "",
                    level: initialData.level || "",
                    duration: initialData.duration || "",
                    price: initialData.price || "",
                    isActive: initialData.isActive ?? true,
                });
            } else {
                setForm(initialForm);
            }

            setError("");
        }
    }, [isOpen, editMode, initialData]);

    if (!isOpen) return null;

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.title.trim()) {
            setError("El título es obligatorio.");
            return;
        }

        const payload = {
            title: form.title,
            level: form.level || null,
            duration: form.duration || null,
            price: form.price || null,
            isActive: form.isActive,
        };

        try {
            setLoading(true);

            if (editMode && initialData?.id) {
                await updateCourse(initialData.id, payload);
            } else {
                await createCourse(payload);
            }

            onSaved();
            onClose();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "No se pudo guardar el curso."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleOverlayClick(e) {
        if (e.target.classList.contains("adminModalOverlay")) {
            onClose();
        }
    }

    return (
        <div className="adminModalOverlay" onClick={handleOverlayClick}>
            <div className="adminModal">
                <div className="adminModalHeader">
                    <div>
                        <p className="adminCardEyebrow">
                            {editMode ? "Editar curso" : "Nuevo curso"}
                        </p>
                        <h3>{editMode ? "Actualizar curso" : "Crear curso"}</h3>
                    </div>

                    <button
                        type="button"
                        className="adminModalClose"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="adminForm">
                    <div className="adminFormGroup">
                        <label>Título</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Ej: Curso de manicura profesional"
                            maxLength={120}
                            required
                        />
                    </div>

                    <div className="adminFormGroup">
                        <label>Nivel</label>
                        <input
                            type="text"
                            name="level"
                            value={form.level}
                            onChange={handleChange}
                            placeholder="Ej: Básico / Intermedio / Avanzado"
                            maxLength={60}
                        />
                    </div>

                    <div className="adminFormGroup">
                        <label>Duración</label>
                        <input
                            type="text"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            placeholder="Ej: 4 semanas"
                            maxLength={60}
                        />
                    </div>

                    <div className="adminFormGroup">
                        <label>Precio</label>
                        <input
                            type="text"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Ej: ₡45.000"
                            maxLength={40}
                        />
                    </div>

                    <div className="adminCheckboxRow">
                        <label className="adminCheckboxLabel">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                            />
                            <span>Curso activo</span>
                        </label>
                    </div>

                    {error && <div className="adminFormError">{error}</div>}

                    <div className="adminModalActions">
                        <button
                            type="button"
                            className="adminSecondaryBtn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="adminPrimaryBtn"
                            disabled={loading}
                        >
                            {loading
                                ? editMode
                                    ? "Guardando..."
                                    : "Creando..."
                                : editMode
                                    ? "Guardar cambios"
                                    : "Crear curso"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}