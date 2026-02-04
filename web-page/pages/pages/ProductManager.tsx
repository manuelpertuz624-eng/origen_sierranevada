
import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { Product, ProductVariant, Multilingual, MultilingualTags } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const ProductManager: React.FC = () => {
    const { formatPrice } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [activeLangTab, setActiveLangTab] = useState<'es' | 'en'>('es');
    const [saving, setSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState<Partial<Product>>({
        category: 'coffee',
        name: { es: '', en: '' },
        description: { es: '', en: '' },
        story: { es: '', en: '' },
        price: 0,
        stock: 100,
        image_url: '',
        color: '#C5A065',
        mask_type: 'pop',
        badge: { es: '', en: '' },
        variants: []
    });

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await productService.getAllProducts();
        if (!error) setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const resetForm = () => {
        setFormData({
            category: 'coffee',
            name: { es: '', en: '' },
            description: { es: '', en: '' },
            story: { es: '', en: '' },
            price: 0,
            stock: 100,
            image_url: '',
            color: '#C5A065',
            mask_type: 'pop',
            badge: { es: '', en: '' },
            variants: []
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleEdit = (p: Product) => {
        setEditingProduct(p);
        setFormData({ ...p });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, formData);
            } else {
                await productService.createProduct(formData as any);
            }
            resetForm();
            fetchProducts();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const addVariant = () => {
        const newVariant: ProductVariant = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            price: 0,
            stock: 0
        };
        setFormData(prev => ({
            ...prev,
            variants: [...(prev.variants || []), newVariant]
        }));
    };

    const updateVariant = (idx: number, field: keyof ProductVariant, value: any) => {
        const newVariants = [...(formData.variants || [])];
        newVariants[idx] = { ...newVariants[idx], [field]: value };
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    const removeVariant = (idx: number) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants?.filter((_, i) => i !== idx)
        }));
    };

    return (
        <div className="min-h-screen bg-[#050806] text-white pt-32 pb-20 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                    <div className="space-y-2">
                        <div className="inline-block px-3 py-1 bg-[#C5A065]/10 border border-[#C5A065]/30 rounded-full">
                            <span className="text-[10px] text-[#C5A065] font-bold uppercase tracking-[0.2em]">Silo de Control</span>
                        </div>
                        <h1 className="text-4xl font-serif text-white tracking-tight">Maestro de Inventario</h1>
                    </div>

                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-[#C5A065] text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-lg shadow-[#C5A065]/10"
                        >
                            Añadir Nuevo Ritual
                        </button>
                    )}
                </header>

                {showForm && (
                    <div className="mb-20 bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden animate-slide-up">
                        <div className="bg-black/40 p-6 border-b border-white/10 flex justify-between items-center">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setActiveLangTab('es')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeLangTab === 'es' ? 'bg-[#C5A065] text-black' : 'text-white/40 hover:text-white'}`}
                                >
                                    Castellano
                                </button>
                                <button
                                    onClick={() => setActiveLangTab('en')}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeLangTab === 'en' ? 'bg-[#C5A065] text-black' : 'text-white/40 hover:text-white'}`}
                                >
                                    English
                                </button>
                            </div>
                            <button onClick={resetForm} className="text-white/40 hover:text-red-500 transition-colors">
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 lg:p-12 space-y-12">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Nombre del Producto ({activeLangTab.toUpperCase()})</label>
                                        <input
                                            required
                                            value={formData.name?.[activeLangTab] || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: { ...prev.name!, [activeLangTab]: e.target.value } }))}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Categoría</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none"
                                            >
                                                <option value="coffee" className="bg-[#050806]">Café</option>
                                                <option value="accessories" className="bg-[#050806]">Accesorios</option>
                                                <option value="derivatives" className="bg-[#050806]">Derivados</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Puntaje SCA (Opcional)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={formData.score || ''}
                                                onChange={(e) => setFormData(prev => ({ ...prev, score: parseFloat(e.target.value) }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none"
                                                placeholder="Ej: 86.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Color Esencia (HEX)</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    value={formData.color}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                                    className="w-12 h-12 bg-transparent border-none cursor-pointer"
                                                />
                                                <input
                                                    value={formData.color}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Descripción Sensorial ({activeLangTab.toUpperCase()})</label>
                                        <textarea
                                            rows={4}
                                            value={formData.description?.[activeLangTab] || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: { ...prev.description!, [activeLangTab]: e.target.value } }))}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none resize-none px-4 py-3"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">URL de la Imagen (PNG Transparente Recomendado)</label>
                                        <input
                                            value={formData.image_url}
                                            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Precio Base (USD)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Efecto Visual</label>
                                            <select
                                                value={formData.mask_type}
                                                onChange={(e) => setFormData(prev => ({ ...prev, mask_type: e.target.value as any }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none"
                                            >
                                                <option value="pop" className="bg-[#050806]">Pop-out (Dinámico)</option>
                                                <option value="static" className="bg-[#050806]">Estático (Clásico)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Badge / Distintivo ({activeLangTab.toUpperCase()})</label>
                                        <input
                                            value={formData.badge?.[activeLangTab] || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, badge: { ...prev.badge!, [activeLangTab]: e.target.value } }))}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[#C5A065] outline-none"
                                            placeholder="Ej: Edición Limitada, Diseño de Autor"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Variants Section */}
                            <div className="space-y-6 pt-12 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-serif text-[#C5A065]">Presentaciones y Precios</h3>
                                    <button
                                        type="button"
                                        onClick={addVariant}
                                        className="text-[10px] font-bold uppercase tracking-widest border border-[#C5A065]/50 px-4 py-2 rounded-lg hover:bg-[#C5A065] hover:text-black transition-all"
                                    >
                                        + Añadir Presentación
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {formData.variants?.map((v, i) => (
                                        <div key={v.id} className="bg-black/40 border border-white/10 p-6 rounded-2xl relative group animate-fade-in">
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(i)}
                                                className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"
                                            >
                                                <span className="material-icons-outlined text-sm">delete</span>
                                            </button>

                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] uppercase tracking-widest text-[#C5A065]">Nombre</label>
                                                    <input
                                                        value={v.name}
                                                        onChange={(e) => updateVariant(i, 'name', e.target.value)}
                                                        placeholder="250g, 1kg, etc"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#C5A065] outline-none"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] uppercase tracking-widest text-[#C5A065]">Precio (USD)</label>
                                                        <input
                                                            type="number"
                                                            value={v.price}
                                                            onChange={(e) => updateVariant(i, 'price', parseFloat(e.target.value))}
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#C5A065] outline-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] uppercase tracking-widest text-[#C5A065]">Stock</label>
                                                        <input
                                                            type="number"
                                                            value={v.stock}
                                                            onChange={(e) => updateVariant(i, 'stock', parseInt(e.target.value))}
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#C5A065] outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-12 border-t border-white/5 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-gradient-to-r from-[#C5A065] to-[#AA771C] text-black font-bold uppercase tracking-widest py-5 rounded-2xl shadow-xl shadow-[#C5A065]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {saving ? 'Consagrando Cambios...' : (editingProduct ? 'Actualizar Producto' : 'Publicar en Despensa')}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-12 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest py-5 rounded-2xl transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Products List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse"></div>
                        ))
                    ) : products.map((p) => (
                        <div key={p.id} className="group bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-[#C5A065]/50 transition-all duration-500 cursor-pointer flex flex-col">
                            <div className="aspect-video relative overflow-hidden bg-black/40 p-6 flex items-center justify-center">
                                <img src={p.image_url || '/logo-origen-sierra-nevada.svg'} className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-700" alt={p.name.es} />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/60 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/10 text-white/60">{p.category}</span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-serif text-white mb-2">{p.name.es}</h3>
                                <p className="text-white/30 text-xs line-clamp-2 mb-6 font-light">{p.description.es}</p>

                                <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/40 uppercase tracking-widest">Desde</span>
                                        <span className="text-[#C5A065] font-serif text-lg">{formatPrice(p.price)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#C5A065] hover:text-black hover:border-[#C5A065] transition-all"
                                        >
                                            <span className="material-icons-outlined text-base">edit</span>
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (window.confirm('¿Eliminar este producto?')) {
                                                    await productService.deleteProduct(p.id);
                                                    fetchProducts();
                                                }
                                            }}
                                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                        >
                                            <span className="material-icons-outlined text-base">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
