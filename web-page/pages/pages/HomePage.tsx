import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { t, formatPrice } = useLanguage();
    // Pricing state logic not strictly needed yet as user just wants UI, but good to have placeholders
    // const [purchaseType, setPurchaseType] = useState('subscribe'); // Keeping existing but unused for now

    // Hero Product Configuration State
    const [selectedGrind, setSelectedGrind] = useState('Grano Entero');
    const [selectedWeight, setSelectedWeight] = useState('250g');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            {/* Hero Section Inmersivo "La Firma de la Tierra" */}
            {/* Hero Section: The "Cerebral Luxury" Experience */}
            <header className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#050806] pt-20 lg:pt-0">

                {/* 1. ATMOSPHERIC BACKGROUND LAYERS */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Base Texture */}
                    <img
                        alt="Sierra Nevada Texture"
                        className="w-full h-full object-cover opacity-30 filter blur-sm grayscale contrast-125 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcfAtXK3rO0DtljnnG98PWskBu0QIToFPcvB-G_wdSE1gPPoRefQj9wBEQwIF1hyVZEJIeb9EX1GyHYkuUrgDl3yDsLWABFaFGrYkdWG0MuXBAnm-uy7guEIXcwo1KUzQBE78bHQOH32lkwEQYosLe-sT-OvYBvUKE9XCyXSRjb-jsEVJAc4qcVT6dcVDtct1NHtwEezMsCd_rOzArG4Nd6VvlZ6HsfdzvFmMQ728789xZkrYQn6BZWo_kNRNpp5E6D5h2tQv6Lqep"
                    />
                    {/* Deep Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#050806]/80 to-transparent"></div>
                    {/* Golden Spotlights */}
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#C5A065] rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-[#4A3B22] rounded-full filter blur-[100px] opacity-20"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* 2. LEFT COLUMN: THE ARTEFACT (Product Visual) */}
                    <div className="lg:col-span-6 flex justify-center items-center relative order-1 lg:order-1 mt-10 lg:mt-0 animate-fade-in-right perspective-1000">

                        {/* The "Gyroscope" Ring System */}
                        <div className="relative w-[360px] h-[360px] sm:w-[620px] sm:h-[620px] flex items-center justify-center">

                            {/* LAYER 1: BASE (Clipped Inside Circle) - Bottom 2/3 focus */}
                            <div className="absolute inset-0 rounded-full overflow-hidden z-10 flex items-center justify-center">
                                <img
                                    src="/cafe_malu_full_composition.png"
                                    alt="Café Malu Base"
                                    className="w-auto h-[110%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-float-slow transform transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* LAYER 2: THE RING (Frame) */}
                            <div className="absolute inset-0 rounded-full gold-ring-metallic opacity-90 z-20 pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"></div>

                            {/* LAYER 3: POP-OUT (Top 1/3 Only) - Breaks the Frame */}
                            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                                <img
                                    src="/cafe_malu_full_composition.png"
                                    alt="Café Malu Pop-out"
                                    className="w-auto h-[110%] object-contain animate-float-slow transform transition-transform duration-700 ease-out"
                                    style={{ clipPath: 'inset(0 0 60% 0)' }}
                                />
                            </div>

                            {/* Inner Rotating Ring (Subtle Background Detail) */}
                            <div className="absolute inset-4 rounded-full border border-white/5 border-dashed animate-spin-slow z-0 pointer-events-none" style={{ animationDuration: '60s' }}></div>




                            {/* Floating Particles (Gold Dust) */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-[#FBF5B7] rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-[#C5A065] rounded-full opacity-60 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. RIGHT COLUMN: THE INTELLIGENCE (Product Info & Controls) */}
                    <div className="lg:col-span-6 flex flex-col items-start text-left space-y-10 order-2 lg:order-2 animate-fade-in-left pl-0 lg:pl-10">

                        {/* Brand Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="h-[1px] w-12 bg-gradient-to-r from-[#C5A065] to-transparent"></span>
                                <span className="font-accent text-[#C5A065] text-xs tracking-[0.4em] uppercase glow-text">
                                    Colección Exclusiva
                                </span>
                            </div>
                            <div className="relative inline-block group mt-2">
                                {/* Logo Mask with Gold Gradient */}
                                <div
                                    className="h-12 w-48 sm:h-16 sm:w-64 bg-gradient-to-r from-[#C5A065] via-[#FBF5B7] to-[#AA771C] animate-shine origin-left transition-transform duration-500 group-hover:scale-105"
                                    style={{
                                        maskImage: 'url("/logocafemalu.svg")',
                                        WebkitMaskImage: 'url("/logocafemalu.svg")',
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'left center',
                                        WebkitMaskPosition: 'left center'
                                    }}
                                />

                                {/* Glow/Shadow Layer */}
                                <div
                                    className="absolute inset-0 h-12 w-48 sm:h-16 sm:w-64 bg-[#C5A065] blur-[15px] opacity-20 -z-10"
                                    style={{
                                        maskImage: 'url("/logocafemalu.svg")',
                                        WebkitMaskImage: 'url("/logocafemalu.svg")',
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'left center',
                                        WebkitMaskPosition: 'left center'
                                    }}
                                />

                                <span className="absolute -top-3 -right-24 text-[9px] font-sans text-[#FBF5B7] border border-[#FBF5B7]/30 px-2 py-0.5 rounded-full tracking-widest opacity-80 shadow-[0_0_10px_rgba(197,160,101,0.2)]">
                                    PREMIUM
                                </span>
                            </div>
                            <p className="font-accent text-white/60 text-sm tracking-[0.2em] uppercase border-l border-[#C5A065]/50 pl-4 py-1">
                                Notas: Chocolate Oscuro • Nuez Tostada • Caramelo
                            </p>
                        </div>

                        {/* Narrative Description */}
                        <p className="font-body text-gray-400 text-base leading-relaxed max-w-lg opacity-90">
                            Una experiencia sensorial diseñada para la mente despierta. Cultivado en el corazón místico de la Sierra Nevada, cada grano es un testimonio de perfección y pureza ancestral.
                        </p>

                        {/* CONTROL PANEL (Glassmorphism) */}
                        <div className="w-full max-w-lg glass-premium p-6 rounded-xl space-y-6">

                            {/* Configuration Rows */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Presentation Selector */}
                                <div className="space-y-3">
                                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Presentación</label>
                                    <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                        {['Grano', 'Molido'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setSelectedGrind(opt)}
                                                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${selectedGrind === opt
                                                    ? 'bg-[#2A2F2B] text-[#C5A065] shadow-lg border border-[#C5A065]/30'
                                                    : 'text-gray-500 hover:text-white'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Weight Selector */}
                                <div className="space-y-3">
                                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Peso Neto</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['250g', '500g', '1kg'].map((w) => (
                                            <button
                                                key={w}
                                                onClick={() => setSelectedWeight(w)}
                                                className={`py-2 text-[10px] font-bold border rounded-md transition-all ${selectedWeight === w
                                                    ? 'border-[#C5A065] text-[#C5A065] bg-[#C5A065]/10 shadow-[0_0_10px_rgba(197,160,101,0.2)]'
                                                    : 'border-white/10 text-gray-500 bg-transparent hover:border-white/30 hover:text-white'
                                                    }`}
                                            >
                                                {w}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PRICING & ACTION CARD (The "Juice") */}
                        <div className="w-full max-w-lg glass-card-price rounded-2xl p-6 relative group hover:shadow-[0_0_40px_rgba(197,160,101,0.15)] transition-all duration-500">
                            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 relative z-10">

                                {/* Price Stack */}
                                <div className="space-y-1">
                                    {/* Standard Price */}
                                    <div className="flex items-center gap-3 opacity-60">
                                        <span className="text-xs font-accent uppercase tracking-widest text-white">Regular</span>
                                        <span className="text-lg font-display text-white line-through decoration-[#C5A065]/50">$45.000</span>
                                    </div>

                                    {/* Member Price (Hero) */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-[#C5A065] text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1">
                                                <span className="material-icons-outlined text-[10px]">diamond</span> Socio Origen
                                            </span>
                                            <span className="text-[#C5A065] text-[10px] font-bold tracking-widest uppercase border border-[#C5A065] px-2 py-0.5 rounded-sm">-10% OFF</span>
                                        </div>
                                        <span className="text-4xl sm:text-5xl font-display text-white tracking-tight drop-shadow-md">
                                            $40.500
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Actions */}
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none btn-luxury px-8 py-4 text-black font-display font-bold text-xs tracking-[0.25em] uppercase rounded-sm shadow-lg">
                                        Comprar
                                    </button>
                                    <button
                                        onClick={() => navigate('/catalog?filter=coffee')}
                                        className="p-4 border border-white/10 rounded-sm text-white hover:bg-white/5 hover:border-[#C5A065] hover:text-[#C5A065] transition-all backdrop-blur-sm"
                                        title="Ver Detalles Completo"
                                    >
                                        <span className="material-icons-outlined">arrow_outward</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 4. NAVIGATION JEWELRY (Arrows & Dots) */}
                <div className="hidden lg:flex absolute bottom-12 right-20 items-center gap-6 z-20">
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C5A065] hover:border-[#C5A065] hover:scale-110 hover:shadow-[0_0_15px_rgba(197,160,101,0.4)] transition-all duration-300 bg-black/20 backdrop-blur-md group">
                        <span className="material-icons-outlined group-hover:-translate-x-0.5 transition-transform">west</span>
                    </button>
                    <div className="flex gap-3">
                        <div className="w-1.5 h-1.5 bg-[#C5A065] rounded-full shadow-[0_0_8px_#C5A065]"></div>
                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full hover:bg-white/30 transition-colors cursor-pointer"></div>
                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full hover:bg-white/30 transition-colors cursor-pointer"></div>
                    </div>
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C5A065] hover:border-[#C5A065] hover:scale-110 hover:shadow-[0_0_15px_rgba(197,160,101,0.4)] transition-all duration-300 bg-black/20 backdrop-blur-md group">
                        <span className="material-icons-outlined group-hover:translate-x-0.5 transition-transform">east</span>
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="absolute bottom-6 w-full flex justify-between px-6 lg:hidden z-20 pointer-events-none">
                    <div className="flex gap-2 pointer-events-auto">
                        <button className="p-2 border border-white/10 rounded-full bg-black/40 text-white"><span className="material-icons-outlined">west</span></button>
                        <button className="p-2 border border-white/10 rounded-full bg-black/40 text-white"><span className="material-icons-outlined">east</span></button>
                    </div>
                </div>

            </header>

            {/* Story Section */}
            <section className="py-24 bg-surface-light dark:bg-surface-dark relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
                    <h2 className="font-display text-4xl lg:text-5xl text-gray-900 dark:text-white mb-10">{t('home.story_title')}</h2>
                    <div className="relative">
                        <span className="absolute -top-12 -left-8 font-display text-9xl text-primary/10 select-none z-0">“</span>
                        <p className="font-display italic text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-loose relative z-10">
                            {t('home.story_desc')}
                        </p>
                        <span className="absolute -bottom-24 -right-4 font-display text-9xl text-primary/10 select-none z-0 rotate-180">”</span>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                                <span className="material-icons-outlined text-3xl">landscape</span>
                            </div>
                            <h3 className="font-accent font-bold text-sm uppercase tracking-widest mb-2 dark:text-white">{t('home.high_alt')}</h3>
                            <p className="text-xs text-gray-500">{t('home.high_alt_sub')}</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                                <span className="material-icons-outlined text-3xl">water_drop</span>
                            </div>
                            <h3 className="font-accent font-bold text-sm uppercase tracking-widest mb-2 dark:text-white">{t('home.washed')}</h3>
                            <p className="text-xs text-gray-500">{t('home.washed_sub')}</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                                <span className="material-icons-outlined text-3xl">eco</span>
                            </div>
                            <h3 className="font-accent font-bold text-sm uppercase tracking-widest mb-2 dark:text-white">{t('home.sustainable')}</h3>
                            <p className="text-xs text-gray-500">{t('home.sustainable_sub')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Traceability Section */}
            <section className="py-24 bg-background-light dark:bg-background-dark relative border-t border-primary/20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4">
                            <h2 className="font-display text-4xl text-gray-900 dark:text-white mb-6">{t('home.trace_title')}</h2>
                            <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                                {t('home.trace_desc')}
                            </p>
                            <img alt="Coffee Map" className="w-full rounded-lg opacity-80 filter sepia grayscale hover:grayscale-0 transition-all duration-500 shadow-xl border border-gray-200 dark:border-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO5Q1YykryEvYoIHTpXI7jpv2OrcvGw4-J2vABWKMo6aSE5H6muzX7eBmpkE36f9yXBODbF-85LO2AbBB-Qw1iyOgWtjOK0FW16Vfo5uN0xWn8tHSAms_Rb-MoSZM3-hhX1P6ijvYh6JPtbLlSAYOtLJpnVmrDePvopUPIqzfc7eiuP4J40jxnUxVUMNHE3wTfDrmapj3Ko9msvwaPD2RrUw4oz10YE_Y1CMSv8clYJvxmzwjzM76zDzliifEFBbrVkardtyl1B1Wn" />
                        </div>
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-primary/20 bg-surface-light dark:bg-surface-dark shadow-2xl">
                                <div className="p-8 border-b md:border-b-0 md:border-r border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.producer')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Luis Rodriguez</p>
                                </div>
                                <div className="p-8 border-b border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.region')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Minca, Sierra Nevada</p>
                                </div>
                                <div className="p-8 border-b md:border-b-0 md:border-r border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.altitude')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">1,850 MASL</p>
                                </div>
                                <div className="p-8 border-b border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.roast_date')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Oct 24, 2023</p>
                                </div>
                                <div className="p-8 md:col-span-2 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.variety')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Castillo, Caturra</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;