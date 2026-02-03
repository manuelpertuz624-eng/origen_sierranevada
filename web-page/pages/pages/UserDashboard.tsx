import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');

    const handleLogout = async () => {
        await authService.signOut();
        navigate('/');
    };

    // Estructura de pestañas
    const tabs = [
        { id: 'overview', label: 'Mi Origen', icon: 'spa' },
        { id: 'orders', label: 'Mis Pedidos', icon: 'local_shipping' },
        { id: 'settings', label: 'Configuración', icon: 'settings' },
        { id: 'legal', label: 'Legales', icon: 'gavel' },
    ];

    return (
        <div className="min-h-screen bg-[#0B120D] text-white font-sans pt-24 px-6 pb-20">
            <div className="max-w-6xl mx-auto">

                {/* Header de Cliente */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl text-[#C5A065] mb-2">
                            Hola, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                        </h1>
                        <p className="text-gray-400 font-light flex items-center gap-2">
                            <span className="material-icons-outlined text-sm text-[#C5A065]">verified</span>
                            Miembro Origen desde {new Date().getFullYear()}
                        </p>
                    </div>

                    <div className="mt-6 md:mt-0 flex items-center gap-4">
                        {isAdmin ? (
                            <button
                                onClick={() => navigate('/admin')}
                                className="bg-[#C5A065] text-black px-4 py-2 rounded-lg text-center flex items-center gap-2 hover:bg-[#D4B075] transition-all group"
                            >
                                <span className="material-icons-outlined text-sm group-hover:rotate-12 transition-transform">security</span>
                                <div className="text-left leading-tight">
                                    <p className="text-[9px] uppercase tracking-widest font-bold">Modo</p>
                                    <p className="font-bold text-xs">Admin</p>
                                </div>
                            </button>
                        ) : (
                            <div className="bg-[#C5A065]/10 border border-[#C5A065] px-4 py-2 rounded-lg text-center">
                                <p className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Nivel</p>
                                <p className="font-serif text-xl text-white">Semilla</p>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="p-3 rounded-full hover:bg-white/10 transition-colors text-red-400 hover:text-red-300"
                            title="Cerrar Sesión"
                        >
                            <span className="material-icons-outlined">logout</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar de Navegación */}
                    <div className="lg:col-span-3 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group ${activeTab === tab.id
                                    ? 'bg-[#C5A065] text-black shadow-[0_0_20px_rgba(197,160,101,0.3)]'
                                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                            >
                                <span className={`material-icons-outlined ${activeTab === tab.id ? 'text-black' : 'text-[#C5A065] group-hover:text-[#FBF5B7]'}`}>
                                    {tab.icon}
                                </span>
                                <span className="font-bold text-sm tracking-wide uppercase">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Área de Contenido */}
                    <div className="lg:col-span-9">

                        {/* VIEW: OVERVIEW */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Banner de Beneficios */}
                                <div className="bg-gradient-to-r from-[#1A261D] to-[#0B120D] border border-[#C5A065]/30 rounded-2xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A065] rounded-full filter blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                    <div className="relative z-10">
                                        <h3 className="font-serif text-2xl text-white mb-2">Tu Beneficio Exclusivo</h3>
                                        <p className="text-gray-400 mb-6 max-w-md">Como miembro registrado, tienes un descuento permanente del 10% en toda nuestra colección de cafés de especialidad.</p>
                                        <button className="bg-[#C5A065] text-black px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-[#D4B075] transition-colors" onClick={() => navigate('/')}>
                                            Usar Descuento
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="material-icons-outlined text-[#C5A065]">favorite</span>
                                            Tus Favoritos
                                        </h4>
                                        <p className="text-sm text-gray-500 italic">Aún no has guardado favoritos.</p>
                                        <button className="mt-4 text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:underline" onClick={() => navigate('/catalog?filter=coffee')}>Explorar Catálogo</button>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="material-icons-outlined text-[#C5A065]">location_on</span>
                                            Dirección Principal
                                        </h4>
                                        <p className="text-sm text-gray-400">No tienes direcciones guardadas.</p>
                                        <button className="mt-4 text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:underline" onClick={() => setActiveTab('settings')}>Añadir Dirección</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW: ORDERS */}
                        {activeTab === 'orders' && (
                            <div className="animate-fade-in">
                                <h3 className="font-serif text-2xl text-white mb-6">Historial de Pedidos</h3>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                                    <span className="material-icons-outlined text-6xl text-white/20 mb-4">inventory_2</span>
                                    <p className="text-gray-400 mb-2">Aún no has realizado ningún pedido.</p>
                                    <p className="text-sm text-gray-600 mb-6">Tus compras aparecerán aquí con su estado de seguimiento y factura.</p>
                                    <button
                                        onClick={() => navigate('/catalog?filter=coffee')}
                                        className="inline-block border border-[#C5A065] text-[#C5A065] px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-[#C5A065] hover:text-black transition-all"
                                    >
                                        Hacer mi primer pedido
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* VIEW: SETTINGS */}
                        {activeTab === 'settings' && (
                            <div className="animate-fade-in max-w-xl">
                                <h3 className="font-serif text-2xl text-white mb-6">Configuración de Cuenta</h3>
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2">Nombre Completo</label>
                                        <input type="text" defaultValue={user?.user_metadata?.full_name} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2">Email</label>
                                        <input type="email" defaultValue={user?.email} disabled className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2">Teléfono</label>
                                        <input type="tel" defaultValue={user?.user_metadata?.phone} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none" />
                                    </div>

                                    <button type="button" className="bg-[#C5A065] text-black px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-[#D4B075] transition-colors">
                                        Guardar Cambios
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* VIEW: LEGAL */}
                        {activeTab === 'legal' && (
                            <div className="animate-fade-in max-w-2xl">
                                <h3 className="font-serif text-2xl text-white mb-6">Documentación Legal</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#C5A065]/50 transition-colors">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="material-icons-outlined text-[#C5A065]">description</span>
                                            <h4 className="font-bold text-white">Términos y Condiciones</h4>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4">Reglas generales de uso de la plataforma y contratación.</p>
                                        <button className="text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:underline">Leer Documento</button>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#C5A065]/50 transition-colors">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="material-icons-outlined text-[#C5A065]">policy</span>
                                            <h4 className="font-bold text-white">Política de Privacidad</h4>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4">Cómo tratamos tus datos personales (Ley 1581 de 2012).</p>
                                        <button className="text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:underline">Leer Documento</button>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#C5A065]/50 transition-colors">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="material-icons-outlined text-[#C5A065]">cookie</span>
                                            <h4 className="font-bold text-white">Política de Cookies</h4>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4">Detalle de las cookies que aceptaste al registrarte.</p>
                                        <button className="text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:underline">Leer Documento</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
