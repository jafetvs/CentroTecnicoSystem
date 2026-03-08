import { COLORS } from "../styles/theme";

export default function Footer() {
    return (
        <footer className="siteFooter">
            <div className="footerInner">
                <span>© {new Date().getFullYear()} Centro Técnico Gabriela González</span>
                <span>Master Educator Internacional</span>
            </div>
        </footer>
    );
}

