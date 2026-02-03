
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/Footer';

const Catalog: React.FC = () => {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter') || 'all';
    const { addToCart } = useCart();
    const { user } = useAuth();
    const { language } = useLanguage();
    const lang = (language as 'es' | 'en') || 'es';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await productService.getAllProducts();
            if (!error) {
                setProducts(data);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name[lang] || product.name.es,
            sub: `${product.score ? `SCA ${product.score} • ` : ''}${product.badge?.[lang] || ''}`,
            price: user ? product.price * 0.9 : product.price, // 10% discount for users
            qty: 1,
            img: product.image_url || '/cafe_malu_waterfall_minca.png'
        });
    };

    return (
        <div className="min-h-screen bg-[#050806] text-white pt-32 font-sans">
            <div className="container mx-auto px-6 max-w-7xl">
                <header className="mb-16 text-center space-y-4">
                    <div className="inline-block py-1 px-4 border border-[#C5A065]/30 rounded-full bg-[#C5A065]/5">
                        <span className="text-[10px] text-[#C5A065] font-bold uppercase tracking-[0.3em]">Nuestra Cosecha</span>
                    </div>
                    <h1 className="text-5xl font-serif tracking-tight">Cátalogo de Origen</h1>
                    <p className="max-w-xl mx-auto text-white/40 text-sm leading-relaxed">
                        Selecciones exclusivas del corazón de la Sierra Nevada. Cada grano cuenta una historia de pureza y tradición ancestral.
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-12 h-12 border-2 border-[#C5A065]/20 border-t-[#C5A065] rounded-full animate-spin"></div>
                        <p className="text-[#C5A065] text-xs font-bold uppercase tracking-widest">Recolectando los mejores granos...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-24">
                        {products.map((product) => (
                            <div key={product.id} className="group relative bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-[#C5A065]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                                {/* Image Holder */}
                                <div className="aspect-[4/5] relative overflow-hidden bg-black/40 flex items-center justify-center p-8">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                    <img
                                        src={product.image_url || '/cafe_malu_full_composition.png'}
                                        alt={product.name[lang]}
                                        className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-2 scale-90 origin-top-right">
                                        <span className="bg-black/60 backdrop-blur-md text-[#C5A065] border border-[#C5A065]/30 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                            {product.category}
                                        </span>
                                        {product.score && (
                                            <span className="bg-black/60 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                                SCA {product.score}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-serif mb-1 group-hover:text-[#C5A065] transition-colors">{product.name[lang]}</h3>
                                        <p className="text-white/40 text-xs line-clamp-2 leading-relaxed min-h-[32px]">
                                            {product.description[lang]}
                                        </p>
                                    </div>

                                    <div className="mt-auto space-y-6">
                                        <div className="flex items-end justify-between">
                                            <div className="flex flex-col">
                                                {user && (
                                                    <span className="text-[9px] text-[#C5A065] font-bold uppercase tracking-widest mb-1">Precio Socio -10%</span>
                                                )}
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-3xl font-display ${user ? 'text-[#C5A065]' : 'text-white'}`}>
                                                        ${(user ? product.price * 0.9 : product.price).toLocaleString()}
                                                    </span>
                                                    {user && (
                                                        <span className="text-sm text-white/30 line-through decoration-white/20">${product.price.toLocaleString()}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] text-white/30 uppercase tracking-widest">Disponibilidad</p>
                                                <p className={`text-xs font-bold ${product.stock > 0 ? 'text-green-500/60' : 'text-red-500'}`}>
                                                    {product.stock > 0 ? `${product.stock} Unidades` : 'Agotado'}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock <= 0}
                                            className="w-full bg-[#C5A065] hover:bg-[#D4B075] text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] transition-all transform active:scale-95 disabled:opacity-30 disabled:grayscale"
                                        >
                                            {product.stock > 0 ? 'Añadir al Ritual' : 'Próxima Cosecha'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Catalog;
