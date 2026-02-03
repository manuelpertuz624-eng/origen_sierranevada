import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { productService } from '../services/productService';
import { Product } from '../types';


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { language, t } = useLanguage();
    const { addToCart } = useCart();
    const lang = (language as 'es' | 'en') || 'es';

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data, error } = await productService.getAllProducts();
            if (!error) {
                setFeaturedProducts(data.slice(0, 3)); // Show first 3 featured
            }
            setLoading(false);
        };
        fetchFeatured();
    }, []);

    // Interaction State
    const [selectedGrind, setSelectedGrind] = useState('Grano');
    const [selectedWeight, setSelectedWeight] = useState('250g');

    const getProductImage = () => {
        return selectedGrind === 'Molido'
            ? '/cafe_malu_black_bag_minca.png'
            : '/cafe_malu_waterfall_minca.png';
    };

    const handleAddToCart = () => {
        addToCart({
            id: `malu-${selectedWeight}-${selectedGrind}`,
            name: 'Café Malu',
            sub: `${selectedWeight} • ${selectedGrind}`,
            price: 40500,
            qty: 1,
            img: getProductImage()
        });
        setIsDetailsOpen(false); // Close modal if open
    };

    // Detail Modal State
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [activeDetailTab, setActiveDetailTab] = useState<'story' | 'traceability'>('story');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#050806] pt-32 lg:pt-0">

                {/* 1. ATMOSPHERIC BACKGROUND LAYERS */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        alt="Sierra Nevada Texture"
                        className="w-full h-full object-cover opacity-30 filter blur-sm grayscale contrast-125 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcfAtXK3rO0DtljnnG98PWskBu0QIToFPcvB-G_wdSE1gPPoRefQj9wBEQwIF1hyVZEJIeb9EX1GyHYkuUrgDl3yDsLWABFaFGrYkdWG0MuXBAnm-uy7guEIXcwo1KUzQBE78bHQOH32lkwEQYosLe-sT-OvYBvUKE9XCyXSRjb-jsEVJAc4qcVT6dcVDtct1NHtwEezMsCd_rOzArG4Nd6VvlZ6HsfdzvFmMQ728789xZkrYQn6BZWo_kNRNpp5E6D5h2tQv6Lqep"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#050806]/80 to-transparent"></div>
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#C5A065] rounded-full filter blur-[150px] opacity-10 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-[#4A3B22] rounded-full filter blur-[100px] opacity-20"></div>
                </div>



                <div className="container mx-auto px-6 relative z-10">
                    {/* Centered Constrained Content Group */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        {/* Mobile Title View */}
                        <div className="lg:hidden flex flex-col items-center text-center space-y-3 mb-6">
                            <span className="font-accent text-[#C5A065] text-[10px] tracking-[0.3em] uppercase">Colección Exclusiva</span>
                            <img src="/logocafemalu.svg" alt="Café Malü" className="h-16 w-auto" />
                            <p className="font-accent text-white/50 text-[10px] tracking-[0.15em] uppercase border-t border-[#C5A065]/20 pt-2 w-32">Premium</p>
                        </div>

                        {/* Image Side - MASTERPIECE RESTORED */}
                        <div className="flex justify-center lg:justify-end items-center relative animate-fade-in-right perspective-1000 group">
                            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2">
                                {/* Synchronized Image Group for Seamless Pop-out */}
                                <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-y-[-2px]">
                                    {/* LAYER 1: THE BASE (Clipped inside the Ring) */}
                                    <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-transparent to-black/20 top-[45px]">
                                        <img
                                            src="/cafe_malu_full_composition.png"
                                            alt="Café Malu Base"
                                            className="w-auto h-[135%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-float-slow"
                                        />
                                    </div>

                                    {/* LAYER 3: THE POP-OUT (Breaks the frame) */}
                                    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center top-[45px]">
                                        <img
                                            src="/cafe_malu_full_composition.png"
                                            alt="Café Malu Pop-out"
                                            className="w-auto h-[135%] object-contain animate-float-slow filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                                            style={{ clipPath: 'inset(0 0 45% 0)' }}
                                        />
                                    </div>
                                </div>

                                {/* LAYER 2: THE RING (Between Base and Pop-out) */}
                                <div className="absolute inset-0 rounded-full gold-ring-metallic opacity-90 z-20 pointer-events-none border-[1px] border-[#C5A065]/30 group-hover:border-[#C5A065]/60 transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]"></div>

                                <div className="absolute inset-0 pointer-events-none z-40">
                                    <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-[#FBF5B7] rounded-full animate-ping"></div>
                                    <div className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-[#C5A065] rounded-full opacity-60 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Info Side (Leaning Left to Center) */}
                        <div className="flex flex-col items-start text-left space-y-6 lg:space-y-8 animate-fade-in-left">
                            <div className="hidden lg:block space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="h-[1px] w-12 bg-gradient-to-r from-[#C5A065] to-transparent"></span>
                                    <span className="font-accent text-[#C5A065] text-xs tracking-[0.4em] uppercase">Colección Exclusiva</span>
                                </div>
                                <div className="relative inline-block group">
                                    <div className="h-12 w-48 sm:h-16 sm:w-64 bg-gradient-to-r from-[#C5A065] via-[#FBF5B7] to-[#AA771C] animate-shine" style={{ maskImage: 'url("/logocafemalu.svg")', WebkitMaskImage: 'url("/logocafemalu.svg")', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat' }} />
                                    <span className="absolute -top-3 -right-16 text-[9px] font-sans text-[#FBF5B7] border border-[#FBF5B7]/30 px-2 py-0.5 rounded-full tracking-widest opacity-80">PREMIUM</span>
                                </div>
                                <p className="font-accent text-white/60 text-sm tracking-[0.2em] uppercase border-l border-[#C5A065]/50 pl-4">Notas: Chocolate Oscuro • Nuez Tostada • Caramelo</p>
                            </div>

                            <p className="font-body text-gray-400 text-base leading-relaxed max-w-lg opacity-90">
                                Una experiencia sensorial diseñada para la mente despierta. Cultivado en el corazón místico de la Sierra Nevada, cada grano es un testimonio de perfección y pureza ancestral.
                                <button onClick={() => setIsDetailsOpen(true)} className="inline-block ml-2 text-[#C5A065] hover:text-white font-bold text-xs uppercase tracking-widest border-b border-[#C5A065] transition-all">+ Saber Más</button>
                            </p>

                            <div className="w-full max-w-lg glass-premium p-6 rounded-xl space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Presentación</label>
                                        <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                            {['Grano', 'Molido'].map((opt) => (
                                                <button key={opt} onClick={() => setSelectedGrind(opt)} className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${selectedGrind === opt ? 'bg-[#2A2F2B] text-[#C5A065] border border-[#C5A065]/30' : 'text-gray-500'}`}>{opt}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Peso Neto</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['250g', '500g', '1kg'].map((w) => (
                                                <button key={w} onClick={() => setSelectedWeight(w)} className={`py-1.5 text-[10px] font-bold border rounded-md transition-all ${selectedWeight === w ? 'border-[#C5A065] text-[#C5A065] bg-[#C5A065]/10' : 'border-white/10 text-gray-500'}`}>{w}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full max-w-lg glass-card-price rounded-2xl p-6 relative group border border-white/5">
                                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 relative z-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3 opacity-60">
                                            <span className="text-xs font-accent uppercase tracking-widest text-white">Regular</span>
                                            <span className="text-lg font-display text-white line-through decoration-[#C5A065]/50">$45.000</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="bg-[#C5A065] text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1"><span className="material-icons-outlined text-[10px]">diamond</span>{user ? 'TU PRECIO SOCIO' : 'PRECIO SOCIO'}</span>
                                                <span className="text-[#C5A065] text-[10px] font-bold tracking-widest uppercase border border-[#C5A065] px-2 py-0.5 rounded-sm">-10% OFF</span>
                                            </div>
                                            <span className={`text-4xl sm:text-5xl font-display tracking-tight drop-shadow-md ${user ? 'text-[#C5A065]' : 'text-white'}`}>$40.500</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full sm:w-auto">
                                        <button onClick={handleAddToCart} className="flex-1 sm:flex-none btn-luxury px-8 py-4 text-black font-display font-bold text-xs tracking-[0.25em] uppercase rounded-sm shadow-lg transition-all active:scale-95">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </header>

            {/* Featured Selection Section */}
            <section className="py-32 bg-[#050806] relative">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="space-y-4">
                            <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.3em]">Cosechas de Temporada</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight italic">Selección del Tostador</h2>
                        </div>
                        <button
                            onClick={() => navigate('/catalog')}
                            className="text-white/40 hover:text-[#C5A065] text-[10px] font-bold uppercase tracking-widest border-b border-white/10 pb-1 transition-all"
                        >
                            Ver Todo el Catálogo →
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[#C5A065]/20 border-t-[#C5A065] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.05] hover:border-[#C5A065]/30 transition-all duration-500"
                                >
                                    <div className="aspect-square relative mb-8 overflow-hidden rounded-2xl bg-black/40 p-10">
                                        <img
                                            src={product.image_url || '/cafe_malu_full_composition.png'}
                                            alt={product.name[lang]}
                                            className="w-full h-full object-contain filter drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-black/80 backdrop-blur-md text-[#C5A065] border border-[#C5A065]/30 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-serif text-white mb-1 group-hover:text-[#C5A065] transition-colors">{product.name[lang]}</h3>
                                            <p className="text-white/30 text-[10px] uppercase tracking-widest">{product.score ? `SCA ${product.score}` : ''}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-display text-[#C5A065]">${product.price.toLocaleString()}</span>
                                                {user && <span className="text-[9px] text-[#C5A065] font-bold uppercase tracking-widest">-10% Aplicado</span>}
                                            </div>
                                            <button
                                                onClick={() => addToCart({
                                                    id: product.id,
                                                    name: product.name[lang] || product.name.es,
                                                    sub: product.badge?.[lang] || 'Premium',
                                                    price: user ? product.price * 0.9 : product.price,
                                                    qty: 1,
                                                    img: product.image_url || '/cafe_malu_full_composition.png'
                                                })}
                                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#C5A065] hover:text-black hover:border-[#C5A065] transition-all"
                                            >
                                                <span className="material-icons-outlined text-base">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#C5A065]/5 to-transparent pointer-events-none"></div>
            </section>

            {/* Modal & Footer */}
            {isDetailsOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsDetailsOpen(false)} />
                    <div className="relative w-full max-w-5xl h-[85vh] max-h-[700px] bg-[#0A0C0B] border border-[#C5A065]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                        <div className="shrink-0 flex items-center justify-between border-b border-white/10 px-8 py-6 bg-white/5 backdrop-blur-xl z-20">
                            <div className="flex gap-8">
                                <button onClick={() => setActiveDetailTab('story')} className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${activeDetailTab === 'story' ? 'text-[#C5A065]' : 'text-gray-500'}`}>La Historia</button>
                                <button onClick={() => setActiveDetailTab('traceability')} className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${activeDetailTab === 'traceability' ? 'text-[#C5A065]' : 'text-gray-500'}`}>Trazabilidad</button>
                            </div>
                            <button onClick={() => setIsDetailsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-500 hover:text-white transition-colors">
                                <span className="material-icons-outlined text-sm">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                            {activeDetailTab === 'story' ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h3 className="font-display text-3xl text-white">El Alma de la Montaña</h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">En lo alto de los picos brumosos de la Sierra Nevada...</p>
                                    </div>
                                    <img src="/cafe_malu_waterfall_minca.png" alt="Minca" className="rounded-xl opacity-60 h-64 object-cover w-full" />
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <p className="text-gray-400">Escanea el código QR para la ficha técnica...</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: t('home.producer'), val: 'Luis Rodriguez' },
                                            { label: t('home.region'), val: 'Minca' },
                                            { label: t('home.altitude'), val: '1,850 msnm' },
                                            { label: t('home.variety'), val: 'Castillo' }
                                        ].map((item, i) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                <p className="text-[10px] text-gray-500 uppercase">{item.label}</p>
                                                <p className="text-white font-bold">{item.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="shrink-0 border-t border-white/10 p-6 flex justify-between items-center">
                            <p className="text-gray-500 text-[10px] font-mono uppercase">Lote Disponible • #SN-2023-OCT</p>
                            <button onClick={handleAddToCart} className="bg-[#C5A065] text-black font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-sm">Comprar Lote</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default HomePage;