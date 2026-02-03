import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        // Verificar si ya se aceptaron las cookies
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Mostrar banner después de un pequeño delay para no ser invasivo de inmediato
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    // Traducciones simples inline por ahora (idealmente mover a LanguageContext)
    const texts = {
        es: {
            title: 'Respetamos tu Privacidad',
            message: 'Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el tráfico y personalizar contenido. Al continuar navegando, aceptas nuestra Política de Cookies.',
            accept: 'ACEPTAR TODAS',
            decline: 'SOLO NECESARIAS',
            policy: 'Ver Política de Cookies'
        },
        en: {
            title: 'We Respect Your Privacy',
            message: 'We use our own and third-party cookies to improve your browsing experience, analyze traffic, and personalize content. By continuing to browse, you accept our Cookie Policy.',
            accept: 'ACCEPT ALL',
            decline: 'ESSENTIAL ONLY',
            policy: 'View Cookie Policy'
        }
    };

    const t = language === 'es' ? texts.es : texts.en;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 animate-fade-in-up">
            <div className="max-w-7xl mx-auto bg-[#0B120D]/95 backdrop-blur-md border border-[#C5A065]/30 rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] p-6 md:flex md:items-center md:justify-between gap-6 relative">
                {/* Dev Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
                    title="Cerrar sin acción (Dev)"
                >
                    <span className="material-icons-outlined text-sm">close</span>
                </button>

                <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-icons-outlined text-[#C5A065]">cookie</span>
                        <h3 className="text-white font-display text-lg tracking-wide">{t.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-3xl">
                        {t.message}
                        <br className="hidden md:block" />
                        <a href="#" className="text-[#C5A065] underline hover:text-white transition-colors mt-1 inline-block">{t.policy}</a>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-2.5 rounded border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
                    >
                        {t.decline}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded bg-[#C5A065] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#D4B075] hover:shadow-[0_0_15px_rgba(197,160,101,0.3)] transition-all"
                    >
                        {t.accept}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CookieBanner;
