import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

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
    
    // State for interactions
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Cart Data
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Café Malu', sub: 'Whole Bean • 12oz', price: 18.00, qty: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmaqNUGIz6xE4QdGma3lIMlJ-DuyxXb3OOX5zNG9SOcSd5OYp3e-cAhgVRiTXsMHqb09G_OuAdnJN-iUu6DBV67iDtXxJtit_tFJeVSpnVGYIkHZ5GiWKqaPjtsVD8uBR6wK7CT4aH8T-zXsWJvvF0GkTVqHWDCcdMMYPlwogER_cbbGAJ1wHdBmV_D0IxsKmqgczIR3AtplPoCTmoCxRUcm5-f5GWw1Z8eZQ5X-U2ziM1KOfK4CrF-B3QGT-C9FmrR4KWav9ymMf' },
        { id: 2, name: 'V60 Filters', sub: 'Pack of 100', price: 8.50, qty: 1, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZv5nOjp7zmCZWGky4raehhN3mKOLVPfk7eSBc9HNBjO5_kEG1uLCwIfoV2zizjbqLyiS1aAl43qdi4ZMZ3OVO59JxWHZp6TgX6Sw11WEvi_-nzkn5hoEVagZgtxAfYnZgN-h8LhD3zDWvYUSqSYDSFQCQSutsQeJpn7hZcVzpF1vXFP9OjLupDWW_HSc7b0YfZAOUNk9jSQA6kohzyMdBLFhCICbYLZlzToOGgmQZufO0hnnEcHt2CHFGM_tqMBUlTY4q109L_afn' }
    ]);

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const removeCartItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Close menus on route change
    useEffect(() => {
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsMobileMenuOpen(false);
    }, [navigate]);

    // Handle Search
    const searchResults = [
        { title: t('nav.sub'), path: '/subscription', type: 'Page' },
        { title: t('nav.guide'), path: '/guide', type: 'Page' },
        { title: t('nav.ai'), path: '/ai-lab', type: 'Tool' },
        { title: 'Café Malu', path: '/', type: 'Product' },
    ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <nav className="fixed w-full z-40 top-0 transition-all duration-300 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-primary/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-gray-800 dark:text-white p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <span className="material-icons-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>

                    {/* Logo */}
                    <div 
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <span className="font-accent text-[10px] md:text-xs tracking-[0.3em] text-primary mb-1 group-hover:text-amber-300 transition-colors">ORIGEN</span>
                        <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider text-gray-900 dark:text-white group-hover:text-primary transition-colors">SIERRA NEVADA</h1>
                    </div>

                    {/* Desktop Actions */}
                    <div className="flex items-center space-x-2 md:space-x-6 text-gray-800 dark:text-white">
                        <button 
                            onClick={() => navigate('/ai-lab')}
                            className="hidden lg:flex items-center gap-1 hover:text-primary transition-colors font-accent text-xs font-bold tracking-widest px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            <span className="material-icons-outlined text-lg">science</span>
                            {t('nav.ai')}
                        </button>
                        
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden lg:block p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 hover:text-primary transition-colors"
                        >
                            <span className="material-icons-outlined">search</span>
                        </button>
                        
                        <div 
                            className="relative cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 hover:text-primary transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <span className="material-icons-outlined">shopping_bag</span>
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-pulse">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                        
                        {/* Language Toggle */}
                        <button 
                            onClick={toggleLanguage}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group"
                            title="Cambiar Idioma / Change Language"
                        >
                             <span className="material-icons-outlined text-gray-800 dark:text-white group-hover:text-primary transition-colors">language</span>
                             <span className="ml-1 text-xs font-bold text-gray-800 dark:text-white group-hover:text-primary uppercase w-6 text-center">{language}</span>
                        </button>

                        <DarkModeToggle />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 z-30 bg-background-light dark:bg-background-dark pt-24 px-6 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} lg:hidden`}>
                <div className="flex flex-col gap-6">
                     <Link to="/" className="text-2xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">{t('nav.home')}</Link>
                     <Link to="/subscription" className="text-2xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">{t('nav.sub')}</Link>
                     <Link to="/guide" className="text-2xl font-display font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">{t('nav.guide')}</Link>
                     <Link to="/ai-lab" className="text-2xl font-display font-bold text-primary border-b border-primary/30 pb-4 flex items-center justify-between">
                        {t('nav.ai')} <span className="material-icons-outlined">science</span>
                     </Link>
                     <button 
                        onClick={() => setIsSearchOpen(true)}
                        className="text-left text-lg font-body text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-4"
                     >
                        <span className="material-icons-outlined">search</span> {t('nav.search_placeholder')}
                     </button>
                     <button 
                        onClick={toggleLanguage}
                        className="text-left text-lg font-body text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-4 border-t border-gray-200 dark:border-gray-800 pt-4"
                     >
                        <span className="material-icons-outlined">language</span> {language === 'es' ? 'Cambiar a English' : 'Switch to Español'}
                     </button>
                </div>
            </div>

            {/* Cart Drawer */}
            <div className={`fixed inset-0 z-50 pointer-events-none overflow-hidden ${isCartOpen ? 'pointer-events-auto' : ''}`}>
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
                                <div key={item.id} className="flex gap-4 items-center animate-fade-in">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-black/20 rounded-md p-2 flex-shrink-0">
                                        <img src={item.img} className="w-full h-full object-contain filter sepia-[.2]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-gray-900 dark:text-white">{item.name}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.sub}</p>
                                        <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                                    </div>
                                    <button onClick={() => removeCartItem(item.id)} className="text-gray-400 hover:text-red-500 p-2">
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
            <div className={`fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-xl transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
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
