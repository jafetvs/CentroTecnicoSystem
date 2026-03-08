import { useEffect, useState } from "react";
import {
    getCategories,
    deleteCategory,
    getCategoryById,
    deleteCategoryPhoto,
} from "../../services/categoryService";
import CategoryFormModal from "../../components/admin/CategoryFormModal";
import CategoryPhotosModal from "../../components/admin/CategoryPhotosModal";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);

    async function loadCategories() {
        try {
            setLoading(true);
            setError("");
            const data = await getCategories(1, 50);
            setCategories(data.items || []);
        } catch (err) {
            setError("No se pudieron cargar las categorías.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("¿Seguro que deseas eliminar esta categoría?");
        if (!ok) return;

        try {
            await deleteCategory(id);
            await loadCategories();

            if (selectedCategory?.id === id) {
                setSelectedCategory(null);
            }
        } catch (err) {
            alert("No se pudo eliminar la categoría.");
        }
    }

    async function loadCategoryDetail(id) {
        try {
            setDetailLoading(true);
            const data = await getCategoryById(id);
            setSelectedCategory(data);
        } catch (err) {
            alert("No se pudo cargar el detalle de la categoría.");
        } finally {
            setDetailLoading(false);
        }
    }

    async function handleViewDetail(id) {
        await loadCategoryDetail(id);
    }

    async function handleCreated() {
        await loadCategories();
    }

    async function handlePhotosUploaded() {
        if (selectedCategory?.id) {
            await loadCategoryDetail(selectedCategory.id);
        }
        await loadCategories();
    }

    async function handleDeletePhoto(photoId) {
        const ok = window.confirm("¿Seguro que deseas eliminar esta foto?");
        if (!ok) return;

        try {
            await deleteCategoryPhoto(photoId);

            if (selectedCategory?.id) {
                await loadCategoryDetail(selectedCategory.id);
            }

            await loadCategories();
        } catch (err) {
            alert("No se pudo eliminar la foto.");
        }
    }

    return (
        <div className="adminPage">
            <div className="adminSectionHeader">
                <div>
                    <p className="adminCardEyebrow">Módulo</p>
                    <h2>Categorías</h2>
                </div>

                <button
                    className="adminPrimaryBtn"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Nueva categoría
                </button>
            </div>

            {loading && (
                <div className="adminPanelCard">
                    <p className="adminMutedText">Cargando categorías...</p>
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

                        {categories.length === 0 ? (
                            <p className="adminMutedText">No hay categorías registradas.</p>
                        ) : (
                            <div className="adminTableWrap">
                                <table className="adminTable">
                                    <thead>
                                        <tr>
                                            <th>Portada</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Fotos</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td>
                                                    {category.coverUrl ? (
                                                        <img
                                                            src={category.coverUrl}
                                                            alt={category.name}
                                                            className="adminThumb"
                                                        />
                                                    ) : (
                                                        <div className="adminThumb adminThumbPlaceholder">
                                                            Sin imagen
                                                        </div>
                                                    )}
                                                </td>
                                                <td>{category.name}</td>
                                                <td>{category.description || "-"}</td>
                                                <td>{category.photosCount}</td>
                                                <td>
                                                    <div className="adminActions">
                                                        <button
                                                            className="adminActionBtn"
                                                            onClick={() => handleViewDetail(category.id)}
                                                        >
                                                            Ver
                                                        </button>

                                                        <button
                                                            className="adminActionBtn danger"
                                                            onClick={() => handleDelete(category.id)}
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
                        <div className="adminDetailHeader">
                            <h3>Detalle</h3>

                            {selectedCategory && (
                                <button
                                    className="adminPrimaryBtn adminSmallBtn"
                                    onClick={() => setIsPhotosModalOpen(true)}
                                >
                                    Subir fotos
                                </button>
                            )}
                        </div>

                        {detailLoading ? (
                            <p className="adminMutedText">Cargando detalle...</p>
                        ) : !selectedCategory ? (
                            <p className="adminMutedText">
                                Selecciona una categoría para ver su información y sus fotos.
                            </p>
                        ) : (
                            <div className="adminCategoryDetail">
                                <h4>{selectedCategory.name}</h4>
                                <p className="adminMutedText">
                                    {selectedCategory.description || "Sin descripción"}
                                </p>

                                {selectedCategory.coverUrl && (
                                    <img
                                        src={selectedCategory.coverUrl}
                                        alt={selectedCategory.name}
                                        className="adminDetailCover"
                                    />
                                )}

                                <div className="adminPhotoGrid">
                                    {selectedCategory.photos?.length > 0 ? (
                                        selectedCategory.photos.map((photo) => (
                                            <div className="adminPhotoCard" key={photo.id}>
                                                <img
                                                    src={photo.photoUrl}
                                                    alt="Foto categoría"
                                                    className="adminPhotoItem"
                                                />

                                                <button
                                                    className="adminDeletePhotoBtn"
                                                    onClick={() => handleDeletePhoto(photo.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="adminMutedText">No hay fotos todavía.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <CategoryFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreated={handleCreated}
            />

            <CategoryPhotosModal
                isOpen={isPhotosModalOpen}
                categoryId={selectedCategory?.id}
                categoryName={selectedCategory?.name}
                onClose={() => setIsPhotosModalOpen(false)}
                onUploaded={handlePhotosUploaded}
            />
        </div>
    );
}