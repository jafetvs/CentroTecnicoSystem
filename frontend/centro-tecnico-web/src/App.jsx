import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import Portafolio from "./pages/Portafolio";
import Info from "./pages/Info";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./router/ProtectedRoute";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCourses from "./pages/admin/AdminCourses";

import "./styles/LoginPage.css";
import "./styles/AdminPanel.css";

function PublicLayout({ children }) {
    return (
        <div className="appShell">
            <Navbar />
            <main className="appMain">{children}</main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicLayout>
                        <Home />
                    </PublicLayout>
                }
            />
            <Route
                path="/cursos"
                element={
                    <PublicLayout>
                        <Cursos />
                    </PublicLayout>
                }
            />
            <Route
                path="/portafolio"
                element={
                    <PublicLayout>
                        <Portafolio />
                    </PublicLayout>
                }
            />
            <Route
                path="/info"
                element={
                    <PublicLayout>
                        <Info />
                    </PublicLayout>
                }
            />

            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="courses" element={<AdminCourses />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}