export const COURSES = [
    { id: "c-1", title: "Curso: Poligel desde cero", level: "Principiante", duration: "8 horas", price: "₡— (definir)" },
    { id: "c-2", title: "Curso: Manicure profesional", level: "Intermedio", duration: "6 horas", price: "₡— (definir)" },
    { id: "c-3", title: "Curso: Diseños minimalistas", level: "Intermedio", duration: "4 horas", price: "₡— (definir)" },
];

// Por ahora mock, pero OJO: tú dijiste que las categorías las crea ella.
// Entonces después esto viene de la BD (Admin).
export const CATEGORIES = [
    {
        id: "minimalista",
        title: "Estilo minimalista",
        desc: "Diseños limpios y elegantes, tonos neutros y detalles finos.",
        cover: "https://picsum.photos/seed/minimal/900/520",
        items: [
            { id: "min-1", title: "Set minimal #1", note: "Esmaltado neutro con detalles sutiles.", img: "https://picsum.photos/seed/min-1/900/700" },
            { id: "min-2", title: "Set minimal #2", note: "Acabado brillante con líneas finas.", img: "https://picsum.photos/seed/min-2/900/700" },
        ],
    },
];