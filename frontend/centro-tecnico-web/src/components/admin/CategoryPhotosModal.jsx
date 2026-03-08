import { useState } from "react";
import { uploadCategoryPhotos } from "../../services/categoryService";

export default function CategoryPhotosModal({
    isOpen,
    categoryId,
    categoryName,
    onClose,
    onUploaded,
}) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    function handleFilesChange(e) {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles);
        setError("");

        const nextPreviews = selectedFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setPreviews(nextPreviews);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!files.length) {
            setError("Debes seleccionar al menos una imagen.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            files.forEach((file) => {
                formData.append("files", file);
            });

            await uploadCategoryPhotos(categoryId, formData);

            setFiles([]);
            setPreviews([]);
            onUploaded();
            onClose();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "No se pudieron subir las fotos."
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
                        <p className="adminCardEyebrow">Galería</p>
                        <h3>Subir fotos</h3>
                        <p className="adminMutedText">
                            {categoryName ? `Categoría: ${categoryName}` : "Selecciona imágenes"}
                        </p>
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
                        <label>Selecciona una o varias imágenes</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            multiple
                            onChange={handleFilesChange}
                        />
                    </div>

                    {previews.length > 0 && (
                        <div className="adminUploadPreviewGrid">
                            {previews.map((preview, index) => (
                                <div className="adminUploadPreviewCard" key={`${preview.name}-${index}`}>
                                    <img
                                        src={preview.url}
                                        alt={preview.name}
                                        className="adminUploadPreviewImage"
                                    />
                                    <span className="adminUploadPreviewName">
                                        {preview.name}
                                    </span>
                                </div>
                            ))}
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
                            {loading ? "Subiendo..." : "Subir fotos"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}