export default function AdminHeader() {
    const today = new Date().toLocaleDateString("es-CR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="adminHeader">
            <div>
                <p className="adminHeaderEyebrow">Panel administrativo</p>
                <h1 className="adminHeaderTitle">Bienvenido</h1>
            </div>

            <div className="adminHeaderDate">
                <span>{today}</span>
            </div>
        </header>
    );
}