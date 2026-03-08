import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/netflix.css";

export default function GalleryModal({ category, onClose }) {
    const photos = useMemo(() => category?.photos ?? [], [category]);
    const [index, setIndex] = useState(0);

    const viewportRef = useRef(null);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        }

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, photos.length]);

    useEffect(() => {
        setIndex(0);

        requestAnimationFrame(() => {
            scrollToIndex(0, false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category?.id]);

    function clamp(n) {
        return Math.max(0, Math.min(photos.length - 1, n));
    }

    function scrollToIndex(i, smooth = true) {
        const el = viewportRef.current;
        if (!el) return;

        const w = el.clientWidth;

        el.scrollTo({
            left: i * w,
            behavior: smooth ? "smooth" : "auto",
        });
    }

    function next() {
        const i = clamp(index + 1);
        setIndex(i);
        scrollToIndex(i);
    }

    function prev() {
        const i = clamp(index - 1);
        setIndex(i);
        scrollToIndex(i);
    }

    function handleScroll() {
        const el = viewportRef.current;
        if (!el) return;

        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);

        if (i !== index) setIndex(i);
    }

    const touch = useRef({ x: 0, y: 0, t: 0 });

    function onTouchStart(e) {
        const p = e.touches[0];
        touch.current = { x: p.clientX, y: p.clientY, t: Date.now() };
    }

    function onTouchEnd(e) {
        const p = e.changedTouches[0];
        const dx = p.clientX - touch.current.x;
        const dy = p.clientY - touch.current.y;
        const dt = Date.now() - touch.current.t;

        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && dt < 600) {
            if (dx < 0) next();
            else prev();
        }
    }

    const total = photos.length;
    const canPrev = index > 0;
    const canNext = index < total - 1;

    return (
        <div className="storyModal" role="dialog" aria-modal="true">
            <button
                className="storyOverlay"
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
            />

            <div className="storyShell" role="document">
                <div className="storyTop">
                    <div className="storyTopText">
                        <div className="storyTitle">{category.name}</div>
                        <div className="storySub">
                            {total > 0
                                ? `${index + 1}/${total} • ${category.description || "Galería"}`
                                : category.description || "Galería"}
                        </div>
                    </div>

                    <button className="storyClose" type="button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {total > 0 && (
                    <div className="storyProgress">
                        {photos.map((photo, i) => (
                            <div
                                key={photo.id ?? i}
                                className={"storyBar " + (i <= index ? "isOn" : "")}
                            />
                        ))}
                    </div>
                )}

                {total === 0 ? (
                    <div className="storyEmpty">
                        <p>No hay fotos disponibles en esta categoría.</p>
                    </div>
                ) : (
                    <>
                        <div
                            ref={viewportRef}
                            className="storyViewport"
                            onScroll={handleScroll}
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                        >
                            <div className="storyTrack">
                                {photos.map((photo, i) => (
                                    <div className="storySlide" key={photo.id ?? i}>
                                        <div className="storyFrame">
                                            <img
                                                className="storyImg"
                                                src={photo.photoUrl}
                                                alt={`${category.name} ${i + 1}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="storyControls">
                            <button
                                className="storyBtn"
                                type="button"
                                onClick={prev}
                                disabled={!canPrev}
                            >
                                ‹
                            </button>

                            <div className="storyDots">
                                {photos.map((photo, i) => (
                                    <button
                                        key={photo.id ?? i}
                                        type="button"
                                        className={"storyDot " + (i === index ? "isActive" : "")}
                                        onClick={() => {
                                            setIndex(i);
                                            scrollToIndex(i);
                                        }}
                                        aria-label={`Ir a foto ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                className="storyBtn"
                                type="button"
                                onClick={next}
                                disabled={!canNext}
                            >
                                ›
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}