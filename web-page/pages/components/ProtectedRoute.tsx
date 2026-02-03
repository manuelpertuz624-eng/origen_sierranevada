
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Elegant loading spinner while checking auth
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A065]"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login, but save the location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        // User is logged in but not admin
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-center p-4">
                <div className="text-[#C5A065] text-6xl mb-4">
                    <i className="fas fa-lock"></i>
                </div>
                <h1 className="text-3xl font-display text-white mb-2">Acceso Restringido</h1>
                <p className="text-white/60 mb-6">Esta área es exclusiva para administradores.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-2 border border-[#C5A065] text-[#C5A065] rounded-full hover:bg-[#C5A065] hover:text-black transition-colors"
                >
                    Volver al Inicio
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
