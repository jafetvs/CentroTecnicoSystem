import { useState } from "react";
import { createCategory } from "../../services/categoryService";

export default function CategoryFormModal({ isOpen, onClose, onCreated }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        coverFile: null,
    });

    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleFileChange(e) {
        const file = e.target.files?.[0] || null;

        setForm((prev) => ({
            ...prev,
            coverFile: file,
        }));

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview("");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.name.trim()) {
            setError("El nombre es obligatorio.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description || "");

            if (form.coverFile) {
                formData.append("coverFile", form.coverFile);
            }

            await createCategory(formData);

            setForm({
                name: "",
                description: "",
                coverFile: null,
            });
            setPreview("");

            onCreated();
            onClose();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "No se pudo crear la categoría."
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
                        <p className="adminCardEyebrow">Nueva categoría</p>
                        <h3>Crear categoría</h3>
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
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej: Uñas brillantes"
                            maxLength={80}
                            required
                        />
                    </div>

                    <div className="adminFormGroup">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe esta categoría..."
                            maxLength={250}
                            rows="4"
                        />
                    </div>

                    <div className="adminFormGroup">
                        <label>Portada</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <div className="adminPreviewBox">
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="adminPreviewImage"
                            />
                        </div>
                    )}

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
                            {loading ? "Creando..." : "Crear categoría"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}