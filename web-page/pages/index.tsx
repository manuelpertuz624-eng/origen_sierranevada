/* eslint-disable no-undef */
// Access Globals provided by UMD scripts
const { createContext, useState, useContext, useEffect } = React;
const { HashRouter, Routes, Route, useNavigate, useLocation, Link } = ReactRouterDOM;
const ReactDOM = window.ReactDOM;

// SVG Logo Component
// Extracted from La-firma-de-la-tierra.svg
// SVG Logo Component
// Extracted from logo-completo-origen-sierra-nevada.svg
const LogoSVG = ({ className, color = "currentColor" }) => (
  <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535.03 89.12" className={className} fill={color} style={{ fill: color }}>
    <text transform="translate(301 40.44) scale(1.23 1)" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '47.36px' }}>
      <tspan x="0" y="0">O</tspan>
      <tspan x="37.98" y="0">R</tspan>
      <tspan x="71.42" y="0">I</tspan>
      <tspan x="89.46" y="0">GEN</tspan>
    </text>
    <g>
      <path d="M159.69,19.09c-2.13-2.43-6.04-6.75-8.84-8.45-1.9-1.15-5.63,1.79-7.24,2.89-8.37,5.69-15.05,13.62-23,19.6-2.68,2.01-4.59,2.48-7.34,3.98-4.34,2.35-10.26,10.86-14.83,11.24-3.39.29-5.46-2.09-7.91-4.03-5.83-4.62-8.23-8.44-16.06-3.38-5.07,3.28-9.78,8.31-14.49,12.14-15.16,12.29-33.53,23.97-53.97,25.94-.53.05-3.33.3-3.51.17-.51-.35-.23-1.62-.29-2.17,15.67-.67,30.2-7.35,42.78-15.7,9.49-6.3,16.9-13.89,25.78-20.41,6.46-4.74,10.45-6.49,17.61-1.43,1.79,1.27,7.63,6.98,9.13,7.04,2.97.11,7.41-5.52,9.42-7.34,4-3.61,8.44-4.93,12.63-8.16,6.69-5.15,12.57-11.58,19.31-16.77,2.6-2,7.89-6.35,11.33-5.85,4.05.59,9.74,8.08,13.16,10.55,2.65,1.91,4.66,2.11,7.48,3.27,4.33,1.79,8.2,6.61,11.49,9.81,2.7,2.63,7.83,8.64,11.11,10.03.54.89,1.93,1.82,3.1,2.1,9.6,2.34,10.38-9.9,20.92-7.12,4.69,1.24,14.47,12.29,18.69,15.92,13.38,11.56,29.38,19.93,47.15,23.77l10.58.92c1.54,2-.29,2.06-2.08,1.96-21.41-1.22-42.01-11.69-57.47-25.22-4.39-3.83-8.32-8.77-12.75-12.34-7.19-5.78-10.62-2.95-16.28,2.43-15.25,14.5-36.81,38.88-61.23,35.4-.66-.1-1.57-.42-1.35-1.22.35-1.27,1.99-.48,2.84-.47,17.87.28,31.14-10.09,43.51-20.93,2.34-2.05,9.14-7.92,10.6-10.07,1.18-1.74-1.71-.97-2.98-1.15-2.58-.37-4.31-1.4-6.27-2.98-3.56-2.88-6.93-7.65-10.64-9.89-.86-2-6.92-7.79-9.12-8.74-1.79-.77-3.57-.77-5.48-1.72-2.11-1.04-3.32-2.67-5.47-3.59h-.02Z" />
      <path d="M123.52,73.59c.09-.21,3.23-2.34,3.81-2.86,5.74-5.21,5.56-8.72,8.3-15.11,1.63-3.81,5.08-8.37,8.42-10.98.64-.5,3.35-2.71,4.09-2.01,1.19,1.12-3.88,4.3-4.71,5.16-5.21,5.35-4.74,11.72-8.42,17.58-1.59,2.53-7.13,8.23-9.98,9.22-.85.3-1.94,0-1.51-1h0Z" />
    </g>
    <text transform="translate(304.2 75.97) scale(.85 1)" style={{ fontFamily: "'Papyrus', fantasy", fontSize: '24.51px', strokeWidth: '0.75px' }}>
      SIERRA   NEVADA
    </text>
  </svg>
);

/* ---------------------------------------------------------------------------------------
   1. LANGUAGE CONTEXT
   --------------------------------------------------------------------------------------- */
const translations = {
  // Navbar
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.sub': { es: 'Suscripción', en: 'Subscription' },
  'nav.guide': { es: 'Guía', en: 'Brewing Guide' },
  'nav.ai': { es: 'Laboratorio IA', en: 'AI Lab' },
  'nav.search_placeholder': { es: 'Buscar...', en: 'Type to search...' },
  'nav.cart_title': { es: 'Tu Carrito', en: 'Your Cart' },
  'nav.cart_empty': { es: 'Tu carrito está vacío', en: 'Your cart is empty' },
  'nav.cart_start': { es: 'Empezar a Comprar', en: 'Start Shopping' },
  'nav.checkout': { es: 'Pagar', en: 'Checkout' },
  'nav.subtotal': { es: 'Subtotal', en: 'Subtotal' },
  'nav.search_results': { es: 'Resultados', en: 'Results' },
  'nav.no_results': { es: 'No se encontraron resultados para', en: 'No results found for' },
  'nav.jump': { es: 'Ir a', en: 'Jump to' },

  // Home
  'home.hero.title_prefix': { es: 'Café', en: 'Café' },
  'home.hero.badge': { es: 'Especialidad Origen Único', en: 'Single Origin Specialty' },
  'home.reviews': { es: 'Reseñas', en: 'Reviews' },
  'home.desc': { es: 'Cultivado en las elevaciones místicas de la Sierra Nevada, Café Malu ofrece un equilibrio raro de acidez y cuerpo. Experimenta la herencia de generaciones en cada taza.', en: 'Grown in the mystical elevations of Sierra Nevada, Café Malu offers a rare balance of acidity and body. Experience the heritage of generations in every cup.' },
  'home.sub_save': { es: 'Suscríbete y Ahorra', en: 'Subscribe & Save' },
  'home.best_value': { es: 'Mejor Valor', en: 'Best Value' },
  'home.sub_details': { es: 'por bolsa 340g • Entrega mensual', en: 'per 12oz bag • Delivered monthly' },
  'home.onetime': { es: 'Compra Única', en: 'One-time' },
  'home.single_purchase': { es: 'Compra individual', en: 'Single purchase' },
  'home.add_cart': { es: 'Agregar al Carrito', en: 'Add to Cart' },
  'home.learn_more': { es: 'Leer Más', en: 'Learn More' },
  'home.story_title': { es: 'La Historia Detrás del Grano', en: 'The Story Behind Each Bean' },
  'home.story_desc': { es: 'En lo alto de los picos brumosos de la Sierra Nevada, donde las nubes tocan el suelo, se encuentra el origen de Café Malu. Cultivado por manos que han conocido estas tierras durante siglos, nuestros granos crecen bajo la sombra de árboles nativos, preservando la biodiversidad de la selva.', en: 'High in the misty peaks of the Sierra Nevada, where the clouds touch the soil, lies the origin of Café Malu. Cultivated by hands that have known these lands for centuries, our beans are shade-grown under a canopy of native trees, preserving the biodiversity of the rainforest.' },
  'home.trace_title': { es: 'Trazabilidad', en: 'Traceability' },
  'home.trace_desc': { es: 'Creemos en la transparencia total. Saber exactamente de dónde viene tu café te conecta con el viaje y las personas detrás de cada taza.', en: 'We believe in full transparency. Knowing exactly where your coffee comes from connects you to the journey and the people behind every cup.' },
  'home.producer': { es: 'Productor', en: 'Producer' },
  'home.region': { es: 'Región', en: 'Region' },
  'home.altitude': { es: 'Altitud', en: 'Altitude' },
  'home.roast_date': { es: 'Fecha Tueste', en: 'Roast Date' },
  'home.variety': { es: 'Variedad', en: 'Variety' },
  'home.high_alt': { es: 'Alta Altitud', en: 'High Altitude' },
  'home.washed': { es: 'Proceso Lavado', en: 'Washed Process' },
  'home.sustainable': { es: 'Sostenible', en: 'Sustainable' },
  'home.high_alt_sub': { es: '1,800m msnm', en: '1,800m above sea level' },
  'home.washed_sub': { es: 'Limpio y brillante', en: 'Clean, bright finish' },
  'home.sustainable_sub': { es: 'Amigable con aves', en: 'Bird-friendly farming' },

  // Footer
  'footer.explore': { es: 'Explorar', en: 'Explore' },
  'footer.join': { es: 'Únete al Ritual', en: 'Join the Ritual' },
  'footer.desc': { es: 'Suscríbete para recibir consejos de preparación y acceso anticipado a funciones de IA.', en: 'Subscribe to receive brewing tips, exclusive single-origin drops, and early access to our AI features.' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.privacy': { es: 'Política de Privacidad', en: 'Privacy Policy' },
  'footer.terms': { es: 'Términos', en: 'Terms of Service' },
  'footer.shipping': { es: 'Envíos', en: 'Shipping' },
  'footer.enter_email': { es: 'Ingresa tu correo', en: 'Enter your email address' },
  'footer.sub_btn': { es: 'Suscribirse', en: 'Subscribe' },
  'footer.sub_success': { es: '¡Suscrito!', en: 'Subscribed!' },
};

const LanguageContext = createContext(undefined);

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [currency, setCurrency] = useState('COP');

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'es' ? 'en' : 'es';
      setCurrency(newLang === 'es' ? 'COP' : 'USD');
      return newLang;
    });
  };

  const t = (key, defaultText = '') => {
    return translations[key]?.[language] || defaultText || key;
  };

  const formatPrice = (priceUSD) => {
    if (currency === 'USD') {
      return `$${priceUSD.toFixed(2)}`;
    } else {
      const priceCOP = priceUSD * 4000;
      return `$${priceCOP.toLocaleString('es-CO')}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, currency, toggleLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

/* ---------------------------------------------------------------------------------------
   2. NAVBAR COMPONENT
   --------------------------------------------------------------------------------------- */
const DarkModeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white" title="Toggle Theme">
      <span className="material-icons-outlined block dark:hidden">dark_mode</span>
      <span className="material-icons-outlined hidden dark:block text-primary">light_mode</span>
    </button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t, formatPrice } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Café Malu', sub: 'Whole Bean • 12oz', price: 18.00, qty: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmaqNUGIz6xE4QdGma3lIMlJ-DuyxXb3OOX5zNG9SOcSd5OYp3e-cAhgVRiTXsMHqb09G_OuAdnJN-iUu6DBV67iDtXxJtit_tFJeVSpnVGYIkHZ5GiWKqaPjtsVD8uBR6wK7CT4aH8T-zXsWJvvF0GkTVqHWDCcdMMYPlwogER_cbbGAJ1wHdBmV_D0IxsKmqgczIR3AtplPoCTmoCxRUcm5-f5GWw1Z8eZQ5X-U2ziM1KOfK4CrF-B3QGT-C9FmrR4KWav9ymMf' }
  ]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <React.Fragment>
      <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${isScrolled ? 'bg-background-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-primary/20' : 'bg-gradient-to-b from-black/80 to-transparent py-6 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:text-primary'}`}>
            <span className="material-icons-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            {/* Logo SVG: White/Gold on transparent (Top), Green on Scrolled (Light mode), Gold on Scrolled (Dark mode) */}
            <LogoSVG
              className="h-12 w-auto transition-colors duration-300"
              color={isScrolled ? (document.documentElement.classList.contains('dark') ? '#C8AA6E' : '#141E16') : '#C8AA6E'}
            />
          </div>
          <div className="flex items-center space-x-4 text-white">
            <button onClick={() => setIsSearchOpen(true)} className="hidden lg:block p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors">
              <span className="material-icons-outlined">search</span>
            </button>
            <div className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors" onClick={() => setIsCartOpen(true)}>
              <span className="material-icons-outlined">shopping_bag</span>
              {cartItems.length > 0 && <span className="absolute top-0 right-0 bg-primary text-background-dark text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">{cartItems.length}</span>}
            </div>
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-white/10 transition-colors"><span className="font-accent text-xs text-white uppercase">{language}</span></button>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      {isCartOpen && <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>}
    </React.Fragment>
  );
};

/* ---------------------------------------------------------------------------------------
   3. FOOTER COMPONENT
   --------------------------------------------------------------------------------------- */
const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setStatus('success'); setTimeout(() => setStatus('idle'), 3000); }
  };

  return (
    <footer className="bg-surface-dark text-white pt-20 pb-10 border-t border-primary/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1 text-center md:text-left">
          <span className="font-accent text-xs tracking-[0.3em] text-primary mb-2 block">EST. 2023</span>
          <div className="mb-6 flex justify-center md:justify-start">
            <LogoSVG className="h-16 w-auto" color="#C8AA6E" />
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <h3 className="font-accent font-bold text-sm text-white uppercase tracking-widest mb-6">{t('footer.join')}</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('footer.enter_email')} className="flex-1 bg-white/5 border border-white/10 rounded px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" />
            <button type="submit" className={`px-8 py-3 font-accent font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 ${status === 'success' ? 'bg-green-600 text-white' : 'bg-primary hover:bg-primary-hover text-black'}`}>{status === 'success' ? t('footer.sub_success') : t('footer.sub_btn')}</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 text-xs text-gray-500 font-body text-center">
        <p>© 2023 Origen Sierra Nevada. {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

/* ---------------------------------------------------------------------------------------
   4. HOME PAGE COMPONENT
   --------------------------------------------------------------------------------------- */
const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <header className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img alt="Misty Sierra Nevada Mountains" className="w-full h-full object-cover opacity-80 dark:opacity-60 filter brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcfAtXK3rO0DtljnnG98PWskBu0QIToFPcvB-G_wdSE1gYPoRefQj9wBEQwIF1hyVZEJIeb9EX1GyHYkuUrgDl3yDsLWABFaFGrYkdWG0MuXBAnm-uy7guEIXcwo1KUzQBE78bHQOH32lkwEQYosLe-sT-OvYBvUKE9XCyXSRjb-jsEVJAc4qcVT6dcVDtct1NHtwEezMsCd_rOzArG4Nd6VvlZ6HsfdzvFmMQ728789xZkrYQn6BZWo_kNRNpp5E6D5h2tQv6Lqep" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-transparent to-background-light dark:to-background-dark h-full"></div>
        </div>
        <div className="relative z-10 text-center px-4 mt-16 max-w-4xl mx-auto">
          <h2 className="font-accent text-primary text-sm sm:text-base tracking-[0.4em] mb-4 uppercase animate-fade-up">{t('home.hero.badge')}</h2>
          <h1 className="font-display text-white text-5xl sm:text-7xl lg:text-8xl mb-6 tracking-wide drop-shadow-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>LA FIRMA DE LA <span className="font-organic text-primary italic">TIERRA</span></h1>
          <p className="font-body text-gray-200 text-lg sm:text-xl tracking-widest uppercase mb-12 animate-fade-up max-w-2xl mx-auto" style={{ animationDelay: '0.4s' }}>{t('home.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button className="bg-primary hover:bg-primary-hover text-background-dark font-display font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 border border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(200,170,110,0.3)]">{t('home.add_cart')}</button>
            <button className="bg-transparent hover:bg-white/10 text-white font-display font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 border border-white/30 hover:border-white transition-all duration-300 backdrop-blur-sm">{t('home.learn_more')}</button>
          </div>
        </div>
      </header>
      <section className="py-24 bg-surface-light dark:bg-surface-dark relative text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-4xl lg:text-5xl text-gray-900 dark:text-white mb-10">{t('home.story_title')}</h2>
          <p className="font-display italic text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-loose">{t('home.story_desc')}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

/* ---------------------------------------------------------------------------------------
   5. APP ROOT
   --------------------------------------------------------------------------------------- */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-body transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </HashRouter>
    </LanguageProvider>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
