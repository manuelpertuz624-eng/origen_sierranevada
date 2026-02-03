import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const DarkModeToggle = () => {
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors text-gray-800 dark:text-white"
            title="Toggle Theme"
        >
            <span className="material-icons-outlined block dark:hidden">dark_mode</span>
            <span className="material-icons-outlined hidden dark:block text-primary">light_mode</span>
        </button>
    );
};

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { language, toggleLanguage, t, formatPrice } = useLanguage();
    const { user, isAdmin } = useAuth();
    const { cartItems, removeFromCart, updateQty, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    // State for interactions
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Close menus on route change
    useEffect(() => {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
    }, [navigate]);

    // Scroll state for transparency
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // ... (rest of search/cart logic)
    const searchResults: any[] = [];

    return (
        <>
            <nav className={`fixed w-full z-50 top-0 transition-all duration-500 flex flex-col items-center ${isScrolled
                ? 'bg-background-dark/95 backdrop-blur-md shadow-lg border-b border-primary/20'
                : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
                }`}>

                {/* 1. MOBILE LAYOUT (Stacked) - Visible only on LG and below */}
                <div className="w-full lg:hidden flex flex-col bg-[#050806] border-b border-white/10 shadow-xl">
                    {/* Top Tier: Logo Throne */}
                    <div className="w-full flex justify-center py-3 border-b border-white/5">
                        <img
                            src="/logo-origen-sierra-nevada.svg"
                            alt="Origen Sierra Nevada"
                            className="h-10 w-auto max-w-[180px] object-contain drop-shadow-md filter brightness-110"
                            onClick={() => navigate('/')}
                        />
                    </div>

                    {/* Bottom Tier: Control Bar */}
                    <div className="w-full flex justify-between items-center px-6 py-3">
                        {/* Left: Menu Trigger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-primary transition-colors p-1"
                        >
                            <span className="material-icons-outlined text-xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {/* Language (Mobile) */}
                            <button
                                onClick={toggleLanguage}
                                className="text-white text-[10px] font-accent border border-white/20 rounded px-1.5 py-0.5 hover:border-primary hover:text-primary transition-colors"
                            >
                                {language.toUpperCase()}
                            </button>

                            {/* Dark Mode (Mobile) */}
                            <div className="scale-75 origin-center">
                                <DarkModeToggle />
                            </div>

                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-white hover:text-primary transition-colors p-1 ml-2"
                            >
                                <span className="material-icons-outlined text-xl">search</span>
                            </button>

                            <div
                                className="relative cursor-pointer text-white hover:text-primary transition-colors p-1"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <span className="material-icons-outlined text-xl">shopping_bag</span>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-background-dark text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full border border-black">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* 2. DESKTOP LAYOUT (Classic Row) - Visible only on LG+ */}
                <div className="hidden lg:flex max-w-7xl mx-auto px-6 w-full justify-between items-center py-4">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <img
                            src="/logo-origen-sierra-nevada.svg"
                            alt="Origen Sierra Nevada"
                            className={`transition-all duration-500 ${isScrolled ? 'h-10' : 'h-12'} w-auto drop-shadow-md`}
                        />
                    </div>


                    {/* Desktop Menu */}
                    <div className="flex items-center space-x-8 font-display text-sm tracking-widest text-white">
                        <Link to="/catalog?filter=coffee" className="hover:text-primary transition-colors">CAFÉ ORIGEN</Link>
                        <Link to="/catalog?filter=accessories" className="hover:text-primary transition-colors">ACCESORIOS</Link>
                        <Link to="/catalog?filter=derivates" className="hover:text-primary transition-colors">DERIVADOS</Link>
                        {isAdmin && (
                            <Link to="/admin" className="hover:text-white transition-colors text-[#C5A065] border border-[#C5A065]/50 px-3 py-1 rounded-full bg-[#C5A065]/5 flex items-center gap-2 hover:bg-[#C5A065] hover:border-[#C5A065] hover:text-black transition-all">
                                <span className="material-icons-outlined text-sm">admin_panel_settings</span>
                                ADMIN
                            </Link>
                        )}
                    </div>

                    {/* Desktop Actions */}
                    <div className="flex items-center space-x-4 text-white">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div
                                    className="hidden xl:block text-right cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => navigate('/account')}
                                    title="Ir a mi cuenta"
                                >
                                    <p className="text-[10px] text-[#C5A065] uppercase tracking-widest font-bold">HOLA</p>
                                    <p className="text-xs text-white max-w-[100px] truncate">{user.email?.split('@')[0]}</p>
                                </div>
                                <button
                                    onClick={async () => {
                                        await import('../services/authService').then(m => m.authService.signOut());
                                        window.location.href = '/';
                                    }}
                                    className="p-2 rounded-full hover:bg-white/10 hover:text-red-400 transition-colors"
                                    title="Cerrar Sesión"
                                >
                                    <span className="material-icons-outlined">logout</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
                                title="Iniciar Sesión"
                            >
                                <span className="material-icons-outlined">login</span>
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/ai-lab')}
                            className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
                            title={t('nav.ai')}
                        >
                            <span className="material-icons-outlined">science</span>
                        </button>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
                        >
                            <span className="material-icons-outlined">search</span>
                        </button>

                        <div
                            className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <span className="material-icons-outlined">shopping_bag</span>
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-primary text-background-dark text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors group"
                            title="Cambiar Idioma"
                        >
                            <span className="font-accent text-xs text-white group-hover:text-primary">{language.toUpperCase()}</span>
                        </button>

                        <DarkModeToggle />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer - SLIDE FROM LEFT */}
            <div className={`fixed inset-0 z-40 bg-background-light dark:bg-background-dark pt-[140px] px-6 transition-transform duration-500 transform lg:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full invisible'}`}>
                <div className="flex flex-col gap-6 animate-fade-in-right" style={{ animationDelay: '0.2s' }}>

                    {/* Mobile User Profile Section */}
                    {user ? (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-3" onClick={() => { navigate('/account'); setIsMobileMenuOpen(false); }}>
                                <div className="w-10 h-10 rounded-full bg-[#C5A065]/20 flex items-center justify-center text-[#C5A065] font-bold">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-white font-bold text-sm truncate w-32">{user.user_metadata?.full_name || 'Usuario'}</p>
                                    <p className="text-gray-400 text-xs truncate w-32">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={async () => {
                                    await import('../services/authService').then(m => m.authService.signOut());
                                    window.location.href = '/';
                                }}
                                className="p-2 text-red-400 hover:bg-white/5 rounded-full"
                            >
                                <span className="material-icons-outlined">logout</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                            className="bg-[#C5A065] text-black font-bold uppercase tracking-widest py-3 rounded-lg mb-4 hover:bg-[#D4B075]"
                        >
                            Iniciar Sesión
                        </button>
                    )}

                    <Link to="/" className="text-xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">{t('nav.home')}</Link>
                    <Link to="/catalog?filter=coffee" className="text-xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">CAFÉ ORIGEN</Link>
                    <Link to="/catalog?filter=accessories" className="text-xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">ACCESORIOS</Link>
                    <Link to="/catalog?filter=derivates" className="text-xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">DERIVADOS</Link>
                    <Link to="/guide" className="text-xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">{t('nav.guide')}</Link>


                </div>
            </div>

            {/* Cart Drawer */}
            <div className={`fixed inset-0 z-50 overflow-hidden ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsCartOpen(false)}
                ></div>
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-surface-light dark:bg-surface-dark shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <h2 className="font-display text-2xl text-gray-900 dark:text-white">{t('nav.cart_title')}</h2>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                            <span className="material-icons-outlined text-2xl">close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <span className="material-icons-outlined text-6xl mb-4 opacity-30">shopping_basket</span>
                                <p className="font-display text-lg">{t('nav.cart_empty')}</p>
                                <button onClick={() => { setIsCartOpen(false); navigate('/subscription'); }} className="mt-4 text-primary font-bold text-xs uppercase tracking-widest hover:underline">{t('nav.cart_start')}</button>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-center animate-fade-in group">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-black/20 rounded-lg p-2 flex-shrink-0 border border-gray-200 dark:border-white/5 group-hover:border-primary/30 transition-colors">
                                        <img src={item.img} className="w-full h-full object-contain filter sepia-[.2]" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-display text-gray-900 dark:text-white text-sm leading-tight">{item.name}</h3>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tight">{item.sub}</p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-md border border-gray-200 dark:border-white/10">
                                                <button
                                                    onClick={() => updateQty(item.id, item.qty - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                                >
                                                    <span className="material-icons-outlined text-sm">remove</span>
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQty(item.id, item.qty + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                                >
                                                    <span className="material-icons-outlined text-sm">add</span>
                                                </button>
                                            </div>
                                            <span className="font-bold text-primary text-sm">{formatPrice(item.price * item.qty)}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                                        <span className="material-icons-outlined">delete_outline</span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-6 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-accent text-xs font-bold text-gray-500 uppercase tracking-widest">{t('nav.subtotal')}</span>
                                <span className="font-display text-2xl text-gray-900 dark:text-white">{formatPrice(cartTotal)}</span>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                                {t('nav.checkout')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Full Screen Search Overlay */}
            <div className={`fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-xl transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="max-w-4xl mx-auto px-6 pt-32 h-full flex flex-col">
                    <div className="relative border-b-2 border-primary/50 focus-within:border-primary transition-colors">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                            <span className="material-icons-outlined text-3xl">search</span>
                        </span>
                        <input
                            autoFocus={isSearchOpen}
                            type="text"
                            placeholder={t('nav.search_placeholder')}
                            className="w-full bg-transparent border-none text-4xl font-display text-white placeholder-gray-600 pl-14 py-6 focus:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-2"
                        >
                            <span className="material-icons-outlined text-2xl">close</span>
                        </button>
                    </div>

                    <div className="mt-12 overflow-y-auto">
                        {searchQuery && (
                            <div className="space-y-2">
                                <p className="text-primary font-accent text-xs tracking-widest uppercase mb-6">{t('nav.search_results')}</p>
                                {searchResults.length > 0 ? (
                                    searchResults.map((result, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => { navigate(result.path); setIsSearchOpen(false); }}
                                            className="group flex items-center justify-between p-4 rounded-lg hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all animate-fade-in"
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`material-icons-outlined ${result.type === 'Tool' ? 'text-primary' : 'text-gray-500'}`}>
                                                    {result.type === 'Page' ? 'article' : result.type === 'Tool' ? 'smart_toy' : 'local_cafe'}
                                                </span>
                                                <span className="text-xl text-gray-300 group-hover:text-white font-display">{result.title}</span>
                                            </div>
                                            <span className="text-xs text-gray-600 group-hover:text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">{t('nav.jump')}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">{t('nav.no_results')} "{searchQuery}"</p>
                                )}
                            </div>
                        )}
                        {!searchQuery && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
                                {['Pour Over', 'Beans', 'Espresso', 'AI Tools'].map(tag => (
                                    <button key={tag} onClick={() => setSearchQuery(tag)} className="p-4 border border-white/10 rounded hover:bg-white/5 text-gray-400 hover:text-primary transition-colors text-left">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
