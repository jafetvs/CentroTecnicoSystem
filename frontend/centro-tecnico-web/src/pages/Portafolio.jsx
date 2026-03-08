import { useEffect, useState } from "react";
import { getPublicCategories, getPublicCategoryById } from "../services/publicService";
import GalleryModal from "../components/GalleryModal";
import "../styles/netflix.css";

export default function Portafolio() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [active, setActive] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                setError("");
                const data = await getPublicCategories(1, 50);
                setCategories(data.items || []);
            } catch (err) {
                setError("No se pudo cargar el portafolio.");
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    async function handleOpenCategory(categoryId) {
        try {
            setDetailLoading(true);
            const detail = await getPublicCategoryById(categoryId);
            setActive(detail);
        } catch (err) {
            setError("No se pudo abrir la categoría seleccionada.");
        } finally {
            setDetailLoading(false);
        }
    }

    return (
        <div className="nf-page">
            <div className="nf-section">
                <div className="nf-headerRow">
                    <div>
                        <h2 className="nf-title">Portafolio</h2>
                        <p className="nf-subtitle">Categorías de trabajos • Fotos • Detalles</p>
                    </div>
                </div>

                {loading && (
                    <div className="nf-state">
                        <p>Cargando categorías...</p>
                    </div>
                )}

                {error && (
                    <div className="nf-state nf-state--error">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && categories.length === 0 && (
                    <div className="nf-state">
                        <p>No hay categorías disponibles todavía.</p>
                    </div>
                )}

                {!loading && !error && categories.length > 0 && (
                    <div className="nf-grid">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className="nf-card"
                                onClick={() => handleOpenCategory(cat.id)}
                                type="button"
                            >
                                <div className="nf-cardMedia">
                                    <img
                                        className="nf-cardImg"
                                        src={cat.coverUrl || "/placeholder-category.jpg"}
                                        alt={cat.name}
                                    />
                                    <div className="nf-cardOverlay" />
                                    <div className="nf-cardBadge">{cat.photosCount} fotos</div>
                                </div>

                                <div className="nf-cardBody">
                                    <div className="nf-cardName">{cat.name}</div>
                                    <div className="nf-cardDesc">{cat.description || "Sin descripción"}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {detailLoading && (
                <div className="nf-state">
                    <p>Cargando galería...</p>
                </div>
            )}

            {active && (
                <GalleryModal category={active} onClose={() => setActive(null)} />
            )}
        </div>
    );
}