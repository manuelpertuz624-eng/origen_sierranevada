import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubscriptionPage from './pages/SubscriptionPage';
import BrewingGuidePage from './pages/BrewingGuidePage';
import AiLabPage from './pages/AiLabPage';
import LoginPage from './pages/LoginPage';
import Brandbook from './pages/Brandbook';
import AdminDashboard from './pages/AdminDashboard';
import ProductManager from './pages/ProductManager';
import UserManager from './pages/UserManager';
import RegisterPage from './pages/RegisterPage';
import Catalog from './pages/Catalog';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './pages/UserDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import CookieBanner from './components/CookieBanner';

// Scroll to top wrapper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <LanguageProvider>
                <CartProvider>
                    <HashRouter>
                        <ScrollToTop />
                        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-body transition-colors duration-300">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/subscription" element={<SubscriptionPage />} />
                                <Route path="/guide" element={<BrewingGuidePage />} />
                                <Route path="/ai-lab" element={<AiLabPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/catalog" element={<Catalog />} />

                                {/* Customer Route */}
                                <Route path="/account" element={
                                    <ProtectedRoute requireAdmin={false}>
                                        <UserDashboard />
                                    </ProtectedRoute>
                                } />

                                {/* Protected Routes */}
                                {/* Protected Routes */}
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute requireAdmin={true}>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/products"
                                    element={
                                        <ProtectedRoute requireAdmin={true}>
                                            <ProductManager />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/users"
                                    element={
                                        <ProtectedRoute requireAdmin={true}>
                                            <UserManager />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/brandbook"
                                    element={
                                        <ProtectedRoute requireAdmin={true}>
                                            <Brandbook />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                            <ChatWidget />
                            <CookieBanner />
                        </div>
                    </HashRouter>
                </CartProvider>
            </LanguageProvider>
        </AuthProvider>
    );
};

export default App;