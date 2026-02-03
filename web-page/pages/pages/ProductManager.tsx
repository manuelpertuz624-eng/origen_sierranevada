
import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { Product } from '../types';

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState<Omit<Product, 'id' | 'created_at'>>({
        name: '',
        description: '',
        price: 0,
        region: 'Sierra Nevada',
        roast_level: 'medium',
        image_url: '/coffee-mock.png',
        stock_quantity: 50
    });

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await productService.getAllProducts();
        if (error) {
            console.error("Error fetching products:", error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock_quantity' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const { error } = await productService.createProduct(formData);

        if (error) {
            setMessage({ type: 'error', text: 'Error al guardar: ' + error.message });
        } else {
            setMessage({ type: 'success', text: 'Producto guardado exitosamente.' });
            setFormData({
                name: '',
                description: '',
                price: 0,
                region: 'Sierra Nevada',
                roast_level: 'medium',
                image_url: '/coffee-mock.png',
                stock_quantity: 50
            });
            setShowForm(false);
            fetchProducts();
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        const { error } = await productService.deleteProduct(id);
        if (error) {
            alert('Error al eliminar: ' + error.message);
        } else {
            fetchProducts();
        }
    };

    return (
        <div className="min-h-screen bg-[#0B120D] text-white pt-24 px-6 pb-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex justify-between items-center bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div>
                        <h1 className="text-4xl font-serif text-[#C5A065] tracking-tight">Gestión de Inventario</h1>
                        <p className="text-white/40 mt-1 uppercase tracking-widest text-[10px] font-bold">Reserva del Administrador</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 ${showForm ? 'bg-white/10 text-white' : 'bg-[#C5A065] text-black hover:bg-[#D4B075]'}`}
                    >
                        <span className="material-icons-outlined text-base">{showForm ? 'close' : 'add'}</span>
                        {showForm ? 'Cancelar' : 'Nuevo Café'}
                    </button>
                </header>

                {showForm && (
                    <div className="mb-12 bg-white/5 border border-[#C5A065]/20 rounded-2xl p-8 backdrop-blur-sm animate-fade-in">
                        <h2 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4">Detalles del Nuevo Producto</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold mb-2">Nombre del Café</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold mb-2">Descripción Sensorial</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none transition-all resize-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold mb-2">Precio (COP)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold mb-2">Nivel de Tueste</label>
                                        <select
                                            name="roast_level"
                                            value={formData.roast_level}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none transition-all"
                                        >
                                            <option value="light">Claro (Light)</option>
                                            <option value="medium">Medio (Medium)</option>
                                            <option value="dark">Oscuro (Dark)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold mb-2">Stock Inicial</label>
                                        <input
                                            type="number"
                                            name="stock_quantity"
                                            value={formData.stock_quantity}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold mb-2">Región</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#C5A065] focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-gradient-to-r from-[#C5A065] to-[#AA771C] text-black font-bold uppercase tracking-widest px-10 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(197,160,101,0.3)] transition-all transform active:scale-95 disabled:opacity-50"
                                >
                                    {saving ? 'Procesando...' : 'Publicar en Catálogo'}
                                </button>
                            </div>

                            {message && (
                                <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                                    <span className="material-icons-outlined">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                                    <p className="text-sm font-bold">{message.text}</p>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 border-b border-white/10 bg-black/20 flex justify-between items-center">
                        <h3 className="text-white font-serif text-lg tracking-wide select-none">Existencias Actuales</h3>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white/60">TOTAL: {products.length} SKU</span>
                    </div>

                    {loading ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="inline-block w-8 h-8 border-2 border-[#C5A065]/20 border-t-[#C5A065] rounded-full animate-spin"></div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Sincronizando con Cosecha...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="p-20 text-center">
                            <span className="material-icons-outlined text-6xl text-white/10 mb-4">inventory_2</span>
                            <p className="text-white/40 text-sm italic">No hay productos registrados en el silo todavía.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] uppercase tracking-[0.2em] text-[#C5A065] font-bold border-b border-white/10">
                                        <th className="px-8 py-6">Producto</th>
                                        <th className="px-8 py-6">Perfil</th>
                                        <th className="px-8 py-6 text-center">Stock</th>
                                        <th className="px-8 py-6">Precio</th>
                                        <th className="px-8 py-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {products.map((p) => (
                                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-black/40 rounded-lg border border-white/10 flex items-center justify-center p-2 group-hover:border-[#C5A065]/50 transition-colors">
                                                        <img src="/logo-origen-sierra-nevada.svg" alt="" className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-sm mb-0.5">{p.name}</p>
                                                        <p className="text-white/30 text-[10px] italic line-clamp-1">{p.region}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${p.roast_level === 'dark' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                                                        p.roast_level === 'medium' ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' :
                                                            'bg-green-500/10 border-green-500/30 text-green-500'
                                                    }`}>
                                                    Tueste {p.roast_level}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`text-sm font-mono ${p.stock_quantity < 10 ? 'text-red-500 font-bold' : 'text-white/60'}`}>
                                                    {p.stock_quantity}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-[#C5A065] font-mono text-sm leading-none">
                                                    ${p.price.toLocaleString()}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 text-white/20 hover:text-white transition-colors" title="Editar">
                                                        <span className="material-icons-outlined text-lg">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id)}
                                                        className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <span className="material-icons-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
