import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { productService } from '../services/productService';
import { Product } from '../types';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { language, t, formatPrice } = useLanguage();
    const { addToCart } = useCart();
    const lang = (language as 'es' | 'en') || 'es';

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Viewer State (Now in Hero)
    const [activeViewerCat, setActiveViewerCat] = useState<'coffee' | 'accessories' | 'derivatives'>('coffee');
    const [viewerIdx, setViewerIdx] = useState(0);

    // Detail Modal State
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [activeDetailTab, setActiveDetailTab] = useState<'story' | 'traceability'>('story');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                // Pre-loading duration to ensure smooth transition
                const minWait = new Promise(resolve => setTimeout(resolve, 800));
                const { data, error } = await productService.getAllProducts();
                await minWait;

                if (!error) {
                    console.log('Total Products loaded:', data.length);
                    setAllProducts(data);
                } else {
                    console.error('Supabase Error:', error);
                }
            } catch (err) {
                console.error('Fetch Crash:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const viewerProducts = allProducts.filter(p => p.category === activeViewerCat);
    const currentProduct = viewerProducts[viewerIdx];

    console.log('Active Category:', activeViewerCat);
    console.log('Filtered Products:', viewerProducts.length);

    const nextProduct = () => setViewerIdx(prev => (prev + 1) % viewerProducts.length);
    const prevProduct = () => setViewerIdx(prev => (prev - 1 + viewerProducts.length) % viewerProducts.length);

    // Reset index when category changes
    useEffect(() => {
        setViewerIdx(0);
    }, [activeViewerCat]);

    const handleAddToCart = () => {
        if (!currentProduct) return;
        addToCart({
            id: currentProduct.id,
            name: currentProduct.name[lang] || currentProduct.name.es,
            sub: currentProduct.badge?.[lang] || 'Premium',
            price: user ? currentProduct.price * 0.9 : currentProduct.price,
            qty: 1,
            img: currentProduct.image_url || '/cafe_malu_full_composition.png'
        });
    };

    return (
        <div className="min-h-screen bg-[#050806] text-white">
            <SEO
                title="El Ritual del Café de Especialidad"
                description="Experimenta el café más puro de Colombia, cultivado en la Sierra Nevada de Santa Marta. Notas de chocolate, nuez y caramelo."
                keywords="café de especialidad, minca, sierra nevada, café premium colombia"
            />

            {/* Hero Section - The Master Viewer */}
            <header className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-44 md:pt-48 lg:pt-20">

                {/* 1. ATMOSPHERIC BACKGROUND LAYERS */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        alt="Sierra Nevada Texture"
                        className="w-full h-full object-cover opacity-20 filter blur-sm grayscale contrast-125 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcfAtXK3rO0DtljnnG98PWskBu0QIToFPcvB-G_wdSE1gPPoRefQj9wBEQwIF1hyVZEJIeb9EX1GyHYkuUrgDl3yDsLWABFaFGrYkdWG0MuXBAnm-uy7guEIXcwo1KUzQBE78bHQOH32lkwEQYosLe-sT-OvYBvUKE9XCyXSRjb-jsEVJAc4qcVT6dcVDtct1NHtwEezMsCd_rOzArG4Nd6VvlZ6HsfdzvFmMQ728789xZkrYQn6BZWo_kNRNpp5E6D5h2tQv6Lqep"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/0 via-[#050806]/80 to-[#050806]"></div>
                    <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#C5A065] rounded-full filter blur-[150px] opacity-5 animate-pulse"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 w-full">

                    {/* MASTER TITLE - NUESTRA DESPENSA EXIBIDORA */}
                    <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 mb-10 lg:mb-24">
                        <div className="space-y-2 md:space-y-3">
                            <h2 className="text-[#C5A065] text-[9px] md:text-sm font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] block animate-fade-in drop-shadow-sm px-4">
                                Nuestra Despensa Exibidora de {
                                    activeViewerCat === 'coffee' ? 'Café' :
                                        activeViewerCat === 'derivatives' ? 'Derivados' : 'Accesorios'
                                }
                            </h2>
                            <div className="h-[1px] w-24 md:w-32 bg-gradient-to-r from-transparent via-[#C5A065]/60 to-transparent mx-auto"></div>
                        </div>

                        {/* Category Selector Tabs */}
                        <div className="flex bg-white/[0.02] border border-white/10 p-1 md:p-1.5 rounded-full backdrop-blur-xl scale-[0.85] sm:scale-95 md:scale-110 animate-slide-up shadow-2xl overflow-hidden">
                            {[
                                { id: 'coffee', label: 'CAFETAL', icon: 'local_cafe' },
                                { id: 'derivatives', label: 'DERIVADOS', icon: 'spa' },
                                { id: 'accessories', label: 'RITUAL', icon: 'settings_input_component' }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveViewerCat(cat.id as any)}
                                    className={`flex items-center gap-1.5 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.25em] transition-all duration-500 ${activeViewerCat === cat.id ? 'bg-[#C5A065] text-black shadow-[0_0_20px_rgba(197,160,101,0.3)]' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                                >
                                    <span className="material-icons-outlined text-xs md:text-base">{cat.icon}</span>
                                    <span className="whitespace-nowrap">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-6">
                            <div className="w-16 h-16 border-2 border-[#C5A065]/10 border-t-[#C5A065] rounded-full animate-spin"></div>
                            <span className="text-[10px] text-[#C5A065] uppercase tracking-[0.4em] animate-pulse">Sintonizando la Sierra...</span>
                        </div>
                    ) : currentProduct ? (
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative">

                            {/* NAVIGATION ARROWS */}
                            {viewerProducts.length > 1 && (
                                <>
                                    <button
                                        onClick={prevProduct}
                                        className="absolute left-[-20px] lg:left-[-100px] top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-[#C5A065] hover:border-[#C5A065]/30 transition-all hover:scale-110 active:scale-90"
                                    >
                                        <span className="material-icons-outlined text-3xl">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={nextProduct}
                                        className="absolute right-[-20px] lg:right-[-100px] top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-[#C5A065] hover:border-[#C5A065]/30 transition-all hover:scale-110 active:scale-90"
                                    >
                                        <span className="material-icons-outlined text-3xl">chevron_right</span>
                                    </button>
                                </>
                            )}

                            {/* Image Side - EXHIBITION STYLE */}
                            <div className="flex justify-center items-center relative animate-fade-in group">
                                <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center transition-all duration-1000 group-hover:scale-[1.02]" key={currentProduct.id}>

                                    {/* THE GOLD RING */}
                                    <div className="absolute inset-4 md:inset-10 rounded-full border border-[#C5A065]/20 bg-gradient-to-b from-white/[0.02] to-transparent shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover:border-[#C5A065]/50 active:scale-95"></div>

                                    {/* Image with Pop-out Effect */}
                                    <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-y-[-15px]">
                                        {activeViewerCat === 'coffee' ? (
                                            <>
                                                {/* Coffee Special Layering */}
                                                <div className="absolute inset-10 md:inset-16 rounded-full overflow-hidden flex items-center justify-center top-[10%]">
                                                    <img
                                                        src={currentProduct.image_url || '/cafe_malu_full_composition.png'}
                                                        className="w-auto h-[130%] object-contain opacity-80"
                                                        alt="Base"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center top-[10%]">
                                                    <img
                                                        src={currentProduct.image_url || '/cafe_malu_full_composition.png'}
                                                        className="w-auto h-[130%] object-contain"
                                                        style={{ clipPath: 'inset(0 0 38% 0)' }}
                                                        alt="Pop-out"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <img
                                                src={currentProduct.image_url || '/cafe_malu_full_composition.png'}
                                                className="w-auto h-[75%] object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                                                alt={currentProduct.name[lang]}
                                            />
                                        )}
                                    </div>

                                    {/* Subdued Glow effect */}
                                    <div className="absolute inset-0 bg-radial-gradient from-[#C5A065]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                                    {/* Particle effects */}
                                    <div className="absolute inset-0 pointer-events-none z-40">
                                        <div className="absolute top-[25%] left-[15%] w-1 h-1 bg-[#FBF5B7] rounded-full animate-pulse"></div>
                                        <div className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 bg-[#C5A065] rounded-full opacity-30 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Side */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 lg:space-y-16 animate-fade-in-up">
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center lg:items-start">
                                        <span className="text-[#C5A065] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block bg-[#C5A065]/5 px-4 py-1.5 rounded-full border border-[#C5A065]/20">
                                            {currentProduct.badge?.[lang] || (currentProduct.score ? `SCA Score: ${currentProduct.score}` : 'Premium Collection')}
                                        </span>
                                        <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] italic">
                                            {currentProduct.name[lang]}
                                        </h1>
                                    </div>
                                    <p className="text-white/40 text-base md:text-xl leading-relaxed italic max-w-lg font-light">
                                        "{currentProduct.description[lang]}"
                                    </p>
                                </div>

                                {/* Pricing & CTAs */}
                                <div className="w-full space-y-12">
                                    <div className="flex flex-col items-center lg:items-start">
                                        {user && <span className="text-[10px] text-[#C5A065] font-bold uppercase tracking-widest mb-3">Ritual de Socio Activo</span>}
                                        <div className="flex items-center gap-8">
                                            <span className={`text-6xl font-display ${user ? 'text-[#C5A065]' : 'text-white'}`}>
                                                {formatPrice(user ? currentProduct.price * 0.9 : currentProduct.price)}
                                            </span>
                                            {user && (
                                                <span className="text-2xl text-white/20 line-through decoration-white/20">
                                                    {formatPrice(currentProduct.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-5 w-full">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-white text-black px-12 py-6 font-bold uppercase tracking-[0.4em] text-[10px] rounded-sm hover:bg-[#C5A065] hover:text-black transition-all duration-500 transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                        >
                                            Iniciar el Ritual
                                        </button>
                                        <button
                                            onClick={() => setIsDetailsOpen(true)}
                                            className="px-10 py-6 border border-white/10 text-white/40 hover:text-white hover:border-white transition-all duration-500 font-bold uppercase tracking-[0.4em] text-[10px] rounded-sm bg-white/[0.02]"
                                        >
                                            La Historia
                                        </button>
                                    </div>
                                </div>

                                {/* Inventory Signal */}
                                <div className="flex items-center gap-6 text-white/10">
                                    <span className="h-[1px] w-16 bg-white/5"></span>
                                    <span className="text-[10px] uppercase tracking-[0.3em]">{currentProduct.stock} unidades en existencia</span>
                                    <span className="h-[1px] w-16 bg-white/5"></span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-48 text-center">
                            <p className="text-white/20 italic text-2xl font-serif">La Sierra está respirando... pronto aparecerán nuevos rituales.</p>
                        </div>
                    )}
                </div>
            </header>

            {/* Basic Detail Modal Implementation for the Viewer */}
            {isDetailsOpen && currentProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsDetailsOpen(false)} />
                    <div className="relative w-full max-w-4xl bg-[#080A09] border border-[#C5A065]/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                        <div className="flex border-b border-white/5 bg-white/[0.02]">
                            <button
                                onClick={() => setActiveDetailTab('story')}
                                className={`flex-1 py-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${activeDetailTab === 'story' ? 'text-[#C5A065] bg-white/[0.03]' : 'text-white/30 hover:text-white'}`}
                            >
                                Nuestra Historia
                            </button>
                            <button
                                onClick={() => setActiveDetailTab('traceability')}
                                className={`flex-1 py-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${activeDetailTab === 'traceability' ? 'text-[#C5A065] bg-white/[0.03]' : 'text-white/30 hover:text-white'}`}
                            >
                                Trazabilidad
                            </button>
                            <button onClick={() => setIsDetailsOpen(false)} className="px-8 border-l border-white/5 text-white/20 hover:text-red-500 transition-colors">
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-12 lg:p-16">
                            {activeDetailTab === 'story' ? (
                                <div className="space-y-8 animate-fade-in">
                                    <h3 className="text-4xl font-serif text-white italic">El Legado de la Montaña</h3>
                                    <p className="text-white/50 leading-relaxed text-lg font-light">
                                        {currentProduct.story?.[lang] || "Cargando el misticismo de la sierra..."}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-12 animate-fade-in">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {[
                                            { label: 'Origen', val: 'Sierra Nevada' },
                                            { label: 'Altitud', val: '1,800 msnm' },
                                            { label: 'Procesamiento', val: 'Lavado' },
                                            { label: 'Puntaje SCA', val: currentProduct.score || '86+' }
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <p className="text-[9px] text-[#C5A065] font-bold uppercase tracking-widest">{item.label}</p>
                                                <p className="text-xl text-white font-serif">{item.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.01]">
                                        <p className="text-sm text-white/40 italic leading-relaxed">
                                            Cada grano ha sido seleccionado bajo la supervisión de expertos tostadores para asegurar que la frecuencia de la montaña llegue intacta a su taza.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-white/5 bg-black/40 flex justify-between items-center">
                            <span className="text-[9px] text-white/20 uppercase tracking-[0.4em]">Ritual Consagrado • Lote Limitado</span>
                            <button
                                onClick={() => { handleAddToCart(); setIsDetailsOpen(false); }}
                                className="bg-[#C5A065] text-black px-10 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-all"
                            >
                                Consagrar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default HomePage;