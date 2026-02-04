
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { emailService } from '../services/emailService';
import { paymentService } from '../services/paymentService';
import { shippingService } from '../services/shippingService';
import { useLanguage } from '../contexts/LanguageContext';

interface CheckoutForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    department: string;
    notes: string;
}

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { formatPrice } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [form, setForm] = useState<CheckoutForm>({
        fullName: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        phone: user?.user_metadata?.phone || '',
        address: '',
        city: '',
        department: '',
        notes: '',
    });

    const [shippingCost, setShippingCost] = useState(0);

    // Descuento del 10% para miembros
    const discount = user ? cartTotal * 0.1 : 0;
    const finalTotal = cartTotal - discount + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (name === 'city') {
            setShippingCost(shippingService.calculateShipping(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setLoading(true);

        try {
            // 1. Crear el pedido en Supabase
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user?.id,
                    total_amount: finalTotal,
                    currency: 'USD',
                    shipping_address: {
                        fullName: form.fullName,
                        address: form.address,
                        city: form.city,
                        department: form.department,
                        phone: form.phone,
                    },
                    metadata: {
                        notes: form.notes,
                        discount_applied: discount > 0,
                    }
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Crear los items del pedido
            const orderItems = cartItems.map(item => ({
                order_id: order.id,
                product_id: parseInt(item.id),
                quantity: item.qty,
                price_at_time: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 2.5 Actualizar Inventario (Restar stock)
            for (const item of cartItems) {
                const { data: product } = await supabase
                    .from('products')
                    .select('stock')
                    .eq('id', item.id)
                    .single();

                if (product) {
                    await supabase
                        .from('products')
                        .update({ stock: Math.max(0, product.stock - item.qty) })
                        .eq('id', item.id);
                }
            }

            // 3. Iniciar Pasarela de Pago (PoliPay/Integra)
            const payment = await paymentService.initiatePayment({
                orderId: order.id,
                amount: finalTotal,
                currency: 'USD',
                customerName: form.fullName,
                customerEmail: form.email
            });

            if (!payment.success) throw new Error('Error en la pasarela de pago');

            // 4. Actualizar estado del pedido a 'paid' si el pago fue exitoso (Simulado)
            await supabase
                .from('orders')
                .update({
                    status: 'paid',
                    payment_id: payment.transactionId,
                    payment_method: payment.provider
                })
                .eq('id', order.id);

            // 5. Notificar al admin
            await emailService.sendOrderNotification('cafemalusm@gmail.com', {
                type: 'NUEVO_PEDIDO_PAGADO',
                orderId: order.id,
                transactionId: payment.transactionId,
                customer: form.fullName,
                total: finalTotal,
                items: cartItems.map(i => `${i.qty}x ${i.name}`).join(', ')
            });

            // 5.5 Notificar al Cliente
            await emailService.sendCustomerOrderEmail(form.email, form.fullName, {
                orderId: order.id,
                total: finalTotal,
                itemsSummary: cartItems.map(i => `<div class="item"><span>${i.qty}x ${i.name}</span> <span>$${(i.price * i.qty).toFixed(2)}</span></div>`).join('')
            });

            // 6. Éxito
            setOrderSuccess(true);
            clearCart();

            // Redirigir después de unos segundos
            setTimeout(() => {
                navigate('/account');
            }, 5000);

        } catch (error) {
            console.error('Error procesando pedido:', error);
            alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-[#0B120D] flex items-center justify-center p-6 pt-24">
                <div className="max-w-md w-full bg-[#1A261D] border border-[#C5A065]/30 rounded-2xl p-8 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-[#C5A065]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-outlined text-[#C5A065] text-4xl">check_circle</span>
                    </div>
                    <h1 className="font-serif text-3xl text-white mb-4">¡Pedido Recibido!</h1>
                    <p className="text-gray-400 mb-8">
                        Tu ritual ha sido registrado. Estamos preparando tu selección de la Sierra para que llegue a tu puerta lo antes posible.
                    </p>
                    <div className="bg-black/20 rounded-lg p-4 mb-8 text-left border border-white/5">
                        <p className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold mb-1">Nota importante</p>
                        <p className="text-xs text-gray-400">Te hemos enviado un correo con los detalles del pedido y los pasos para el pago (Simulado: Integra/PoliPay).</p>
                    </div>
                    <button
                        onClick={() => navigate('/account')}
                        className="w-full bg-[#C5A065] text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#D4B075] transition-all"
                    >
                        Ir a Mi Cuenta
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B120D] text-white pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-[#C5A065] mb-12 text-center">Finalizar Ritual</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Formulario */}
                    <div className="lg:col-span-7 space-y-8">
                        <form onSubmit={handleSubmit} id="checkout-form" className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-2xl">
                            <h2 className="font-serif text-2xl text-white mb-6 border-b border-white/10 pb-4">Información de Envío</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Nombre Completo</label>
                                    <input
                                        required
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-[#C5A065] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Teléfono de Contacto</label>
                                    <input
                                        required
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleInputChange}
                                        type="tel"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-[#C5A065] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Dirección Completa</label>
                                <input
                                    required
                                    name="address"
                                    value={form.address}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Calle, número, apto/oficina"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-[#C5A065] outline-none transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Ciudad</label>
                                    <input
                                        required
                                        name="city"
                                        value={form.city}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-[#C5A065] outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Departamento</label>
                                    <input
                                        required
                                        name="department"
                                        value={form.department}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-[#C5A065] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">Notas del Pedido (Opcional)</label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-[#C5A065] outline-none transition-colors resize-none"
                                ></textarea>
                            </div>
                        </form>

                        <div className="bg-[#C5A065]/5 border border-[#C5A065]/20 p-8 rounded-2xl">
                            <h2 className="font-serif text-2xl text-white mb-6">Método de Pago</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 border border-[#C5A065] bg-[#C5A065]/10 rounded-xl">
                                    <div className="w-6 h-6 rounded-full border-4 border-[#C5A065] bg-black"></div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Integra / PoliPay (Redeban)</p>
                                        <p className="text-[10px] text-gray-400 uppercase">Tarjetas de Crédito, Débito, PSE</p>
                                    </div>
                                    <span className="material-icons-outlined text-[#C5A065]">account_balance_wallet</span>
                                </div>
                                <p className="text-[10px] text-gray-500 text-center italic">Próximamente más métodos de pago disponibles</p>
                            </div>
                        </div>
                    </div>

                    {/* Resumen */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                                <h2 className="font-serif text-2xl text-white mb-6 border-b border-white/10 pb-4">Tu Selección</h2>

                                <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 p-1">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white leading-tight">{item.name}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase">{item.qty} unidad(es)</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-[#C5A065]">{formatPrice(item.price * item.qty)}</p>
                                        </div>
                                    ))}
                                    {cartItems.length === 0 && (
                                        <p className="text-gray-500 italic text-center py-4">Tu carrito está vacío</p>
                                    )}
                                </div>

                                <div className="space-y-3 border-t border-white/10 pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-400">
                                            <span>Descuento Miembro (10%)</span>
                                            <span>-{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Envío</span>
                                        <span className={shippingCost === 0 && form.city ? "text-green-400 font-bold text-xs" : "text-white"}>
                                            {form.city ? (shippingCost === 0 ? '¡GRATIS!' : formatPrice(shippingCost)) : 'Calculado en checkout'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xl font-serif pt-4 border-t border-white/10">
                                        <span className="text-white">Total</span>
                                        <span className="text-[#C5A065]">{formatPrice(finalTotal)}</span>
                                    </div>
                                </div>

                                <button
                                    form="checkout-form"
                                    disabled={loading || cartItems.length === 0}
                                    className={`w-full mt-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg ${loading || cartItems.length === 0
                                        ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                        : 'bg-[#C5A065] text-black hover:bg-[#D4B075] shadow-[#C5A065]/20 hover:scale-[1.02]'
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                                            Procesando...
                                        </span>
                                    ) : 'Pagar y Finalizar'}
                                </button>

                                <p className="text-[9px] text-gray-500 text-center mt-4 leading-relaxed">
                                    Al completar este ritual, aceptas nuestros términos de servicio y políticas de privacidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
