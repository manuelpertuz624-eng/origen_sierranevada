
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

const Brandbook: React.FC = () => {
    const { user } = useAuth();

    const colors = [
        { name: 'Dorado Sierra', hex: '#C8AA6E', class: 'bg-[#C8AA6E]' },
        { name: 'Verde Origen Profundo', hex: '#141E16', class: 'bg-[#141E16]' },
        { name: 'Neblina Blanca', hex: '#F9F8F6', class: 'bg-[#F9F8F6]' },
        { name: 'Tierra Tostada', hex: '#3E2723', class: 'bg-[#3E2723]' },
        { name: 'Cobre Refinado', hex: '#B87333', class: 'bg-[#B87333]' },
    ];

    return (
        <div className="pt-24 min-h-screen bg-zinc-50 dark:bg-[#0B120D]">
            <div className="container mx-auto px-6 py-12">

                {/* Header */}
                <div className="flex justify-between items-center mb-16 border-b border-[#C5A065]/20 pb-8">
                    <div>
                        <h1 className="font-display text-4xl sm:text-5xl text-zinc-900 dark:text-white mb-2">
                            Manual de Marca <span className="text-[#C5A065]">.</span>
                        </h1>
                        <p className="font-body text-zinc-500 dark:text-gray-400">
                            Guía oficial de estilos y uso para Origen Sierra Nevada.
                        </p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-[#C5A065] uppercase tracking-widest font-bold">Bienvenido</p>
                        <p className="text-sm text-white">{user?.email}</p>
                        <button
                            onClick={() => authService.signOut()}
                            className="text-xs text-red-400 hover:text-red-300 underline mt-1"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Section: Colors */}
                <section className="mb-20">
                    <h2 className="font-display text-2xl text-zinc-800 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[#C5A065]"></span>
                        Paleta de Colores
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {colors.map((color) => (
                            <div key={color.hex} className="group cursor-pointer">
                                <div className={`aspect-square rounded-2xl shadow-lg mb-4 ${color.class} transform transition-transform group-hover:scale-105 border border-black/5 dark:border-white/5`}></div>
                                <h3 className="font-accent font-bold text-zinc-900 dark:text-white text-sm">{color.name}</h3>
                                <p className="font-mono text-xs text-zinc-500 dark:text-white/40">{color.hex}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Typography */}
                <section className="mb-20">
                    <h2 className="font-display text-2xl text-zinc-800 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[#C5A065]"></span>
                        Tipografía
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Primary Font */}
                        <div className="p-8 bg-white dark:bg-[#141E16] rounded-xl border border-black/5 dark:border-[#C5A065]/10">
                            <h3 className="text-[#C5A065] font-accent text-sm uppercase tracking-widest mb-4">Principal (Display)</h3>
                            <p className="text-5xl font-display text-zinc-900 dark:text-white mb-4">Playfair Display</p>
                            <p className="font-display text-2xl text-zinc-500 dark:text-white/60">
                                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                abcdefghijklmnopqrstuvwxyz<br />
                                1234567890
                            </p>
                        </div>

                        {/* Secondary Font */}
                        <div className="p-8 bg-white dark:bg-[#141E16] rounded-xl border border-black/5 dark:border-[#C5A065]/10">
                            <h3 className="text-[#C5A065] font-accent text-sm uppercase tracking-widest mb-4">Cuerpo (Body)</h3>
                            <p className="text-5xl font-body text-zinc-900 dark:text-white mb-4">Lato</p>
                            <p className="font-body text-2xl text-zinc-500 dark:text-white/60">
                                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                abcdefghijklmnopqrstuvwxyz<br />
                                1234567890
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section: Logo Construction (Placeholder) */}
                <section className="mb-20">
                    <h2 className="font-display text-2xl text-zinc-800 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[#C5A065]"></span>
                        Logotipo
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="p-12 bg-[#141E16] rounded-2xl flex items-center justify-center border border-[#C5A065]/20 h-64">
                            <img src="/logo-completo.svg" alt="Logo Full" className="max-w-[80%] max-h-[80%] opacity-90" />
                        </div>
                        <div className="p-12 bg-white rounded-2xl flex items-center justify-center border border-black/5 h-64">
                            <img src="/logo-completo.svg" alt="Logo Full Dark" className="max-w-[80%] max-h-[80%] filter invert" />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Brandbook;
