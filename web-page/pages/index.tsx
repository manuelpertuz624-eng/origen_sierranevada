/* eslint-disable no-undef */
// Access Globals provided by UMD scripts
const { createContext, useState, useContext, useEffect } = React;
const { HashRouter, Routes, Route, useNavigate, useLocation, Link } = ReactRouterDOM;
const ReactDOM = window.ReactDOM;

// SVG Logo Component
// Extracted from La-firma-de-la-tierra.svg
const LogoSVG = ({ className, color = "currentColor" }) => (
  <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 120" className={className} fill={color} style={{ fill: color }}>
    {/* ORIGEN - Playfair Display Black (900) - Perfect side-to-side justification */}
    <text
      x="330" y="50"
      textLength="340"
      lengthAdjust="spacing"
      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '48px' }}
    >
      ORIGEN
    </text>

    {/* Mountain Path (Isotipo) - Shifted left to avoid clashing with text */}
    <g transform="translate(10, 15)">
      <path d="M159.69,19.09c-2.13-2.43-6.04-6.75-8.84-8.45-1.9-1.15-5.63,1.79-7.24,2.89-8.37,5.69-15.05,13.62-23,19.6-2.68,2.01-4.59,2.48-7.34,3.98-4.34,2.35-10.26,10.86-14.83,11.24-3.39.29-5.46-2.09-7.91-4.03-5.83-4.62-8.23-8.44-16.06-3.38-5.07,3.28-9.78,8.31-14.49,12.14-15.16,12.29-33.53,23.97-53.97,25.94-.53.05-3.33.3-3.51.17-.51-.35-.23-1.62-.29-2.17,15.67-.67,30.2-7.35,42.78-15.7,9.49-6.3,16.9-13.89,25.78-20.41,6.46-4.74,10.45-6.49,17.61-1.43,1.79,1.27,7.63,6.98,9.13,7.04,2.97.11,7.41-5.52,9.42-7.34,4-3.61,8.44-4.93,12.63-8.16,6.69-5.15,12.57-11.58,19.31-16.77,2.6-2,7.89-6.35,11.33-5.85,4.05.59,9.74,8.08,13.16,10.55,2.65,1.91,4.66,2.11,7.48,3.27,4.33,1.79,8.2,6.61,11.49,9.81,2.7,2.63,7.83,8.64,11.11,10.03.54.89,1.93,1.82,3.1,2.1,9.6,2.34,10.38-9.9,20.92-7.12,4.69,1.24,14.47,12.29,18.69,15.92,13.38,11.56,29.38,19.93,47.15,23.77l10.58.92c1.54,2-.29,2.06-2.08,1.96-21.41-1.22-42.01-11.69-57.47-25.22-4.39-3.83-8.32-8.77-12.75-12.34-7.19-5.78-10.62-2.95-16.28,2.43-15.25,14.5-36.81,38.88-61.23,35.4-.66-.1-1.57-.42-1.35-1.22.35-1.27,1.99-.48,2.84-.47,17.87.28,31.14-10.09,43.51-20.93,2.34-2.05,9.14-7.92,10.6-10.07,1.18-1.74-1.71-.97-2.98-1.15-2.58-.37-4.31-1.4-6.27-2.98-3.56-2.88-6.93-7.65-10.64-9.89-.86-2-6.92-7.79-9.12-8.74-1.79-.77-3.57-.77-5.48-1.72-2.11-1.04-3.32-2.67-5.47-3.59h-.02Z" />
      <path d="M123.52,73.59c.09-.21,3.23-2.34,3.81-2.86,5.74-5.21,5.56-8.72,8.3-15.11,1.63-3.81,5.08-8.37,8.42-10.98.64-.5,3.35-2.71,4.09-2.01,1.19,1.12-3.88,4.3-4.71,5.16-5.21,5.35-4.74,11.72-8.42,17.58-1.59,2.53-7.13,8.23-9.98,9.22-.85.3-1.94,0-1.51-1h0Z" />
    </g>

    {/* SIERRA NEVADA - Papyrus (Regular) - Perfect side-to-side justification */}
    <text
      x="330" y="94"
      textLength="340"
      lengthAdjust="spacing"
      style={{ fontFamily: "'Papyrus', fantasy", fontSize: '24px', fontWeight: 400 }}
    >
      SIERRA NEVADA
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
  'home.close': { es: 'Cerrar', en: 'Close' },
  'home.story_label': { es: 'NUESTRA HERENCIA', en: 'OUR HERITAGE' },
  'home.back_to_product': { es: 'Volver al Producto', en: 'Back to Product' },
  'home.read_less': { es: 'Ver Menos', en: 'Read Less' },
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
const products = [
  {
    id: 1,
    category: 'coffee',
    name: { es: 'Café Malu', en: 'Malu Coffee' },
    badge: { es: 'Especialidad Origen Único', en: 'Single Origin Specialty' },
    score: 88,
    tags: { es: ['Frutal', 'Chocolate', 'Cítrico'], en: ['Fruity', 'Chocolate', 'Citrus'] },
    price: 18.00,
    desc: {
      es: 'Cultivado en las elevaciones místicas de la Sierra Nevada, Café Malu ofrece un equilibrio raro de acidez y cuerpo. Experimenta la herencia de generaciones en cada taza.',
      en: 'Grown in the mystical elevations of Sierra Nevada, Café Malu offers a rare balance of acidity and body. Experience the heritage of generations in every cup.'
    },
    story: {
      es: 'En lo alto de los picos brumosos de la Sierra Nevada, donde las nubes tocan el suelo, se encuentra el origen de Café Malu. Cultivado por manos que han conocido estas tierras durante siglos, nuestros granos crecen bajo la sombra de árboles nativos, preservando la biodiversidad de la selva.',
      en: 'High in the misty peaks of the Sierra Nevada, where the clouds touch the soil, lies the origin of Café Malu. Cultivated by hands that have known these lands for centuries, our beans are shade-grown under a canopy of native trees, preserving the biodiversity of the rainforest.'
    },
    img: 'public/cafe_malu_dual_bags_premium.png',
    color: '#E0A367',
    maskType: 'pop'
  },
  {
    id: 2,
    category: 'coffee',
    name: { es: 'Sombra Sagrada', en: 'Sacred Shade' },
    badge: { es: 'Reserva Ecológica', en: 'Ecological Reserve' },
    score: 91,
    tags: { es: ['Floral', 'Jazmín', 'Miel'], en: ['Floral', 'Jasmine', 'Honey'] },
    price: 24.00,
    desc: {
      es: 'Nuestra reserva más preciada. Un perfil sensorial que evoca los bosques de niebla y la pureza del agua de montaña.',
      en: 'Our most precious reserve. A sensory profile that evokes the cloud forests and the purity of mountain water.'
    },
    story: {
      es: 'Sombra Sagrada proviene de microlotes cultivados a más de 1,900msnm. Cada grano es seleccionado a mano durante el solsticio, respetando los ciclos lunares de la Sierra.',
      en: 'Sacred Shade comes from microlots grown above 1,900m asl. Each bean is hand-selected during the solstice, respecting the lunar cycles of the Sierra.'
    },
    img: 'public/sombra_sagrada_luxury.png',
    overlayImg: 'public/sombra_sagrada_sinfondo.png',
    overlayOffset: 32, // Offset to align bottoms after scaling from pivot
    overlayScale: 1.15, // More aggressive pop-out
    color: '#1C2923',
    maskType: 'pop'
  },
  {
    id: 3,
    category: 'accessories',
    name: { es: 'Dripper Artesanal', en: 'Artisan Dripper' },
    badge: { es: 'Accesorios de Autor', en: 'Designer Accessories' },
    score: null,
    tags: { es: ['Cerámica', 'Hecho a mano', 'Único'], en: ['Ceramic', 'Handmade', 'Unique'] },
    price: 45.00,
    desc: {
      es: 'Piezas únicas moldeadas por el barro de la Sierra, diseñadas para una extracción perfecta y un ritual sagrado.',
      en: 'Unique pieces molded from Sierra clay, designed for perfect extraction and a sacred ritual.'
    },
    story: {
      es: 'Creado en colaboración con alfareros locales de la cuenca del Río Gaira, este dripper mantiene la temperatura ideal para resaltar las notas frutales de Origen.',
      en: 'Created in collaboration with local potters from the Rio Gaira basin, this dripper maintains the ideal temperature to highlight the fruity notes of Origen.'
    },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZv5nOjp7zmCZWGky4raehhN3mKOLVPfk7eSBc9HNBjO5_kEG1uLCwIfoV2zizjbqLyiS1aAl43qdi4ZMZ3OVO59JxWHZp6TgX6Sw11WEvi_-nzkn5hoEVagZgtxAfYnZgN-h8LhD3zDWvYUSqSYDSFQCQSutsQeJpn7hZcVzpF1vXFP9OjLupDWW_HSc7b0YfZAOUNk9jSQA6kohzyMdBLFhCICbYLZlzToOGgmQZufO0hnnEcHt2CHFGM_tqMBUlTY4q109L_afn',
    color: '#D2B48C'
  }
];

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

const Navbar = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t, formatPrice } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Café Malu', sub: 'Whole Bean • 12oz', price: 18.00, qty: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJmaqNUGIz6xE4QdGma3lIMlJ-DuyxXb3OOX5zNG9SOcSd5OYp3e-cAhgVRiTXsMHqb09G_OuAdnJN-iUu6DBV67iDtXxJtit_tFJeVSpnVGYIkHZ5GiWKqaPjtsVD8uBR6wK7CT4aH8T-zXsWJvvF0GkTVqHWDCcdMMYPlwogER_cbbGAJ1wHdBmV_D0IxsKmqgczIR3AtplPoCTmoCxRUcm5-f5GW1Z8eZQ5X-U2ziM1KOfK4CrF-B3QGT-C9FmrR4KWav9ymMf' }
  ]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'coffee', label: { es: 'Café', en: 'Coffee' } },
    { id: 'derivatives', label: { es: 'Derivados', en: 'Derivatives' } },
    { id: 'accessories', label: { es: 'Accesorios', en: 'Accessories' } }
  ];

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <React.Fragment>
      <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${isScrolled ? 'bg-background-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-primary/20' : 'bg-gradient-to-b from-black/80 to-transparent py-6 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
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

          {/* Sub-menu Categorías Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-accent text-[10px] uppercase tracking-[0.3em] transition-all duration-300 relative pb-1 ${activeCategory === cat.id ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                {cat.label[language]}
                {activeCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary animate-width-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-white">
            <button onClick={() => setIsSearchOpen(true)} className="hidden lg:block p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors">
              <span className="material-icons-outlined">search</span>
            </button>
            <div className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 hover:text-primary transition-colors" onClick={() => setIsCartOpen(true)}>
              <span className="material-icons-outlined">shopping_bag</span>
              <span className="absolute top-0 right-0 bg-primary text-background-dark text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">1</span>
            </div>
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:block"><span className="font-accent text-xs text-white uppercase">{language}</span></button>
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
const HomePage = ({ activeCategory }) => {
  const navigate = useNavigate();
  const { language, t, formatPrice } = useLanguage();

  // Filtered products based on selected category
  const filteredProducts = products.filter(p => p.category === activeCategory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'

  // Parallax state for mouse tracking
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Reset active index when category changes
  useEffect(() => { setActiveIndex(0); setIsExpanded(false); }, [activeCategory]);

  const activeProduct = filteredProducts[activeIndex] || products[0];

  const handleProductChange = (newIndex, dir) => {
    setDirection(dir);
    setIsSwitching(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsExpanded(false);
      setTimeout(() => setIsSwitching(false), 50);
    }, 300);
  };

  const nextProduct = () => {
    const nextIdx = (activeIndex + 1) % filteredProducts.length;
    handleProductChange(nextIdx, 'next');
  };

  const prevProduct = () => {
    const prevIdx = (activeIndex - 1 + filteredProducts.length) % filteredProducts.length;
    handleProductChange(prevIdx, 'prev');
  };

  const handleMouseMove = (e) => {
    if (isExpanded) return;
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 40;
    const y = (clientY - window.innerHeight / 2) / 40;
    setParallax({ x, y });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 pt-20" onMouseMove={handleMouseMove}>
      {/* Carousel Hero with Cinematic Blur */}
      <header className={`relative min-h-[90vh] flex items-center overflow-hidden px-6 lg:px-20 transition-all duration-1000 ${isExpanded ? 'blur-md brightness-50 scale-95' : ''}`}>

        {/* Navigation Arrows - Extremes of the Hero */}
        <button
          onClick={prevProduct}
          className="absolute left-4 sm:left-10 z-40 transition-all hover:scale-125 text-primary/40 hover:text-primary active:scale-90 p-4"
          title="Anterior"
        >
          <span className="material-icons-outlined text-5xl sm:text-7xl">chevron_left</span>
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-4 sm:right-10 z-40 transition-all hover:scale-125 text-primary/40 hover:text-primary active:scale-90 p-4"
          title="Siguiente"
        >
          <span className="material-icons-outlined text-5xl sm:text-7xl">chevron_right</span>
        </button>

        {/* Dynamic Atmospheric Glow - Responds to Product Color */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none transition-all duration-1000 opacity-20"
          style={{ backgroundColor: activeProduct.color }}
        ></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Product Image & Navigation with Re-engineered Portal */}
          <div className="relative flex justify-center items-center order-2 lg:order-1 select-none min-h-[400px] sm:min-h-[600px]">

            {/* 1. Pure Gold Metallic Orbital Ring - The Anchor */}
            <div className="absolute w-[310px] h-[310px] sm:w-[510px] sm:h-[510px] gold-ring-metallic rounded-full animate-spin-slow"></div>

            {/* 2. Secondary Decorative Ring (Dashed) */}
            <div className="absolute w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] border border-dashed border-primary/20 rounded-full opacity-40"></div>

            {/* 3. The Portal - Refined Elegant Sizing with Soft Bottom Edge and Parallax */}
            <div
              className={`relative w-[320px] h-[450px] sm:w-[550px] sm:h-[700px] flex items-center justify-center pointer-events-none z-20 transition-all duration-500
                ${isSwitching ? `opacity-0 blur-md ${direction === 'next' ? '-translate-x-20 scale-90' : 'translate-x-20 scale-90'}` : `opacity-100 translate-x-0 scale-100 blur-0 ${direction === 'next' ? 'animate-swipe-in-left' : 'animate-swipe-in-right'}`}`}
            >
              {/* Layer 1: Base Scene - Always strictly circular */}
              <div
                className="absolute inset-0 flex items-center justify-center portal-mask-circle transition-transform duration-150 ease-out"
                style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
              >
                <img
                  key={`base-${activeProduct.id}`}
                  alt={activeProduct.name[language]}
                  className="w-80 sm:w-[560px] h-auto animate-float-hero-pop drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] pointer-events-auto transform translate-y-12 sm:translate-y-20 soft-bottom-edge"
                  src={activeProduct.img}
                />
              </div>

              {/* Layer 2: Overlay Bag - Using Pop mask if applicable */}
              {activeProduct.overlayImg ? (
                <div
                  className="absolute inset-0 flex items-center justify-center portal-mask-pop transition-transform duration-150 ease-out z-30"
                  style={{ transform: `translate(${parallax.x}px, ${parallax.y + (activeProduct.overlayOffset || 0)}px)` }}
                >
                  <div
                    style={{
                      transform: `scale(${activeProduct.overlayScale || 1})`,
                      transformOrigin: 'bottom center',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      key={`overlay-${activeProduct.id}`}
                      alt={activeProduct.name[language]}
                      className="w-80 sm:w-[560px] h-auto animate-float-hero-pop drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)] pointer-events-auto transform translate-y-12 sm:translate-y-20 soft-bottom-edge"
                      src={activeProduct.overlayImg}
                    />
                  </div>
                </div>
              ) : activeProduct.maskType === 'pop' ? (
                /* Falling back to single layer with pop for products like Malu */
                <div
                  className="absolute inset-0 flex items-center justify-center portal-mask-pop transition-transform duration-150 ease-out"
                  style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
                >
                  <img
                    key={`base-pop-${activeProduct.id}`}
                    alt={activeProduct.name[language]}
                    className="w-80 sm:w-[560px] h-auto animate-float-hero-pop drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] pointer-events-auto transform translate-y-12 sm:translate-y-20 soft-bottom-edge"
                    src={activeProduct.img}
                  />
                </div>
              ) : null}
            </div>

            {/* 5. Quality Seal (Always Floating on top) */}
            {activeProduct.score && (
              <div className={`absolute top-[10%] right-[5%] sm:top-[15%] sm:right-[15%] bg-background-dark/95 backdrop-blur-md text-primary border border-primary/40 p-5 rounded-full flex flex-col items-center justify-center transform scale-75 sm:scale-110 shadow-2xl z-30 transition-all duration-500 ${isSwitching ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                <span className="text-[10px] font-accent uppercase tracking-widest leading-none text-primary/80">SCAA</span>
                <span className="text-3xl font-display font-black text-white">{activeProduct.score}</span>
                <span className="text-[10px] font-accent uppercase tracking-widest leading-none text-primary/60">PTS</span>
              </div>
            )}
          </div>
          <div className={`order-1 lg:order-2 space-y-6 text-center lg:text-left transition-all duration-500 ${isSwitching ? `opacity-0 blur-md ${direction === 'next' ? 'translate-x-20' : '-translate-x-20'}` : `opacity-100 translate-x-0 blur-0 ${direction === 'next' ? 'animate-swipe-in-left' : 'animate-swipe-in-right'}`}`} key={`info-${activeProduct.id}`}>
            <div>
              <span className="font-accent text-primary tracking-[0.3em] text-xs uppercase block mb-3 animate-fade-up">
                {activeProduct.badge[language]}
              </span>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-text-main-light dark:text-white leading-[0.9] mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {activeProduct.name[language].split(' ')[0]} <span className="text-primary italic font-light">{activeProduct.name[language].split(' ')[1] || ''}</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-primary text-sm mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <span className="material-icons text-base">star</span>
                <span className="material-icons text-base">star</span>
                <span className="material-icons text-base">star</span>
                <span className="material-icons text-base">star</span>
                <span className="material-icons text-base">star</span>
                <span className="ml-2 font-body text-gray-500 text-xs">(124 {t('home.reviews')})</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {activeProduct.tags[language].map(tag => (
                <span key={tag} className="px-5 py-1.5 border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-body text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {activeProduct.desc[language]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 pt-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="p-6 rounded border-2 border-primary bg-primary/5 shadow-inner">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-accent text-[10px] font-bold text-primary uppercase tracking-widest">{t('home.sub_save')}</span>
                  <span className="bg-primary text-background-dark text-[8px] font-bold px-2 py-0.5 rounded uppercase">{t('home.best_value')}</span>
                </div>
                <span className="block text-3xl font-display text-text-main-light dark:text-white">{formatPrice(activeProduct.price)}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-500">{t('home.sub_details')}</span>
              </div>
              <div className="p-6 rounded border border-gray-200 dark:border-gray-800 bg-white/5 opacity-60 hover:opacity-100 transition-opacity flex flex-col justify-between">
                <span className="font-accent text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{t('home.onetime')}</span>
                <span className="block text-3xl font-display text-gray-400">{formatPrice(activeProduct.price + 4)}</span>
                <span className="text-[10px] text-gray-500">{t('home.single_purchase')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <button className="bg-primary hover:bg-primary-hover text-background-dark font-accent font-bold text-xs tracking-[0.2em] uppercase px-12 py-4 shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1 btn-shine-container btn-shine-effect">
                {t('home.add_cart')}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="border border-white/20 hover:border-primary text-text-main-light dark:text-white font-accent font-bold text-xs tracking-[0.2em] uppercase px-12 py-4 transition-all btn-shine-container btn-shine-effect"
              >
                {isExpanded ? t('home.read_less') : t('home.learn_more')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Expandable Story Section - Cinematic Reveal */}
      <div
        onClick={() => setIsExpanded(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center px-6 transition-all duration-1000 ${isExpanded ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'}`}
      >
        {isExpanded && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl cursor-default"
          >
            <section className="bg-background-dark/80 backdrop-blur-2xl py-20 px-10 sm:px-20 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-fade-up">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-12 h-1 bg-primary mx-auto mb-10 opacity-50"></div>
                <span className="font-accent text-primary text-[10px] tracking-[0.4em] uppercase block mb-6">
                  {t('home.story_label') || 'NUESTRA HERENCIA'}
                </span>
                <h2 className="font-display text-4xl lg:text-6xl text-white mb-10 leading-tight">
                  {t('home.story_title')}
                </h2>
                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-primary/10 text-9xl font-display leading-none select-none">"</span>
                  <p className="font-display italic text-2xl lg:text-3xl text-gray-300 leading-relaxed relative z-10">
                    {activeProduct.story[language]}
                  </p>
                  <span className="absolute -bottom-20 -right-6 text-primary/10 text-9xl font-display leading-none select-none translate-y-10">"</span>
                </div>

                <div className="mt-20 flex justify-center">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-8 py-3 rounded-full font-accent text-[10px] tracking-widest uppercase transition-all"
                  >
                    {t('home.back_to_product') || 'Volver al Producto'}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

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
  const [activeCategory, setActiveCategory] = useState('coffee');

  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-body transition-colors duration-300">
          <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <Routes>
            <Route path="/" element={<HomePage activeCategory={activeCategory} />} />
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
