import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { t, formatPrice } = useLanguage();
    const [purchaseType, setPurchaseType] = useState('subscribe');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
                    <img alt="Coffee texture background" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAetcaf45v-4SGtm1agWKBkRAv1cm287VvB2k6ZVSKxKXZb1iPMpsi1MIbahd20gt-pdnUt1tM0uBGDS2ueIA5qGHdxoULS_ZZlE8ers04TVVjmm4-LabFijS2J2l3NalRgb82yzuHcd3e3liJN48f_0gNgAP35OgKf3HiXmYpnqpyyLBMWCqtgGb0skh-1RlC72BrfYWoULoFqq4lTOu1BP88tq6YhTmeB1j9dnYuBBm4pYxKdaI8D3e2TGCSOi1fwcaJRNXhX2y42"/>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/50 to-background-light dark:via-background-dark/50 dark:to-background-dark z-0"></div>
                
                {/* Grid Layout Restored */}
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    
                    {/* Decorative Shapes Column (Images Removed, Position Adjusted) */}
                    <div className="relative flex justify-center order-2 lg:order-1 h-[500px] lg:h-[600px] items-center">
                        <div className="relative w-full h-full animate-float">
                            {/* Decorative Circles (Background) - Lifted to 32% top to clear text boxes */}
                            <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] border border-primary/30 rounded-full pointer-events-none z-0"></div>
                            <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[480px] lg:h-[480px] border border-dashed border-primary/20 rounded-full animate-spin-slow pointer-events-none z-0"></div>
                            <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0"></div>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
                        <div>
                            <span className="font-accent text-primary tracking-[0.2em] text-sm uppercase block mb-2">{t('home.hero.badge')}</span>
                            <h1 className="font-display text-5xl lg:text-7xl text-gray-900 dark:text-white mb-4 leading-tight">
                                {t('home.hero.title_prefix')} <span className="text-primary italic">Malu</span>
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start space-x-1 text-primary text-sm mb-6">
                                {[1,2,3,4,5].map(i => <span key={i} className="material-icons-outlined text-base">star</span>)}
                                <span className="ml-2 text-gray-500 dark:text-gray-400 font-sans text-xs tracking-wide">(124 {t('home.reviews')})</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                            {['Fruity', 'Chocolate', 'Citrus'].map(tag => (
                                <span key={tag} className="px-4 py-1.5 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest rounded-full">{tag}</span>
                            ))}
                        </div>
                        <p className="font-body text-gray-600 dark:text-gray-300 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0">
                            {t('home.desc')}
                        </p>
                        
                        {/* Purchase Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
                            <label className="relative cursor-pointer group" onClick={() => setPurchaseType('subscribe')}>
                                <input type="radio" name="purchase_type" className="peer sr-only" checked={purchaseType === 'subscribe'} readOnly />
                                <div className={`p-5 rounded-lg border-2 ${purchaseType === 'subscribe' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent'} transition-all shadow-md h-full flex flex-col justify-between text-left`}>
                                    {/* Adjusted Header Layout to prevent overlap */}
                                    <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
                                        <span className="font-accent text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{t('home.sub_save')}</span>
                                        <span className="bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase whitespace-nowrap">{t('home.best_value')}</span>
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-display text-primary">{formatPrice(18.00)}</span>
                                        <span className="text-xs text-gray-500">{t('home.sub_details')}</span>
                                    </div>
                                    <div className={`absolute top-4 right-4 text-primary transition-opacity ${purchaseType === 'subscribe' ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="material-icons-outlined">check_circle</span>
                                    </div>
                                </div>
                            </label>
                            <label className="relative cursor-pointer group" onClick={() => setPurchaseType('onetime')}>
                                <input type="radio" name="purchase_type" className="peer sr-only" checked={purchaseType === 'onetime'} readOnly />
                                <div className={`p-5 rounded-lg border hover:border-primary/50 ${purchaseType === 'onetime' ? 'border-primary' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent opacity-80 hover:opacity-100'} transition-all h-full flex flex-col justify-between text-left`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-accent text-sm font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider">{t('home.onetime')}</span>
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-display text-gray-700 dark:text-gray-400">{formatPrice(22.00)}</span>
                                        <span className="text-xs text-gray-500">{t('home.single_purchase')}</span>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => navigate('/subscription')}
                                className="bg-primary hover:bg-yellow-600 text-black font-accent font-bold text-sm tracking-widest uppercase px-8 py-4 rounded shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                            >
                                {t('home.add_cart')}
                            </button>
                            <button 
                                onClick={() => navigate('/guide')}
                                className="border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white font-accent font-bold text-sm tracking-widest uppercase px-8 py-4 rounded hover:bg-gray-100 dark:hover:bg-white/5 transition-all w-full sm:w-auto"
                            >
                                {t('home.learn_more')}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* SVG Separator */}
                <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[80px] text-surface-light dark:text-surface-dark fill-current" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-background-light dark:fill-background-dark" d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
                        <path className="fill-surface-light dark:fill-surface-dark opacity-100" d="M0,60 L50,80 L100,50 L150,90 L200,60 L250,100 L300,70 L350,90 L400,60 L450,100 L500,70 L550,90 L600,60 L650,100 L700,70 L750,90 L800,60 L850,100 L900,70 L950,90 L1000,60 L1050,100 L1100,70 L1150,90 L1200,60 V120 H0 V60 Z"></path>
                    </svg>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-surface-light dark:bg-surface-dark relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
                    <h2 className="font-display text-4xl lg:text-5xl text-gray-900 dark:text-white mb-10">{t('home.story_title')}</h2>
                    <div className="relative">
                        <span className="absolute -top-12 -left-8 font-display text-9xl text-primary/10 select-none z-0">“</span>
                        <p className="font-display italic text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-loose relative z-10">
                            {t('home.story_desc')}
                        </p>
                        <span className="absolute -bottom-24 -right-4 font-display text-9xl text-primary/10 select-none z-0 rotate-180">”</span>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                                <span className="material-icons-outlined text-3xl">landscape</span>
                            </div>
                            <h3 className="font-accent font-bold text-sm uppercase tracking-widest mb-2 dark:text-white">{t('home.high_alt')}</h3>
                            <p className="text-xs text-gray-500">{t('home.high_alt_sub')}</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                                <span className="material-icons-outlined text-3xl">water_drop</span>
                            </div>
                            <h3 className="font-accent font-bold text-sm uppercase tracking-widest mb-2 dark:text-white">{t('home.washed')}</h3>
                            <p className="text-xs text-gray-500">{t('home.washed_sub')}</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                                <span className="material-icons-outlined text-3xl">eco</span>
                            </div>
                            <h3 className="font-accent font-bold text-sm uppercase tracking-widest mb-2 dark:text-white">{t('home.sustainable')}</h3>
                            <p className="text-xs text-gray-500">{t('home.sustainable_sub')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Traceability Section */}
            <section className="py-24 bg-background-light dark:bg-background-dark relative border-t border-primary/20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4">
                            <h2 className="font-display text-4xl text-gray-900 dark:text-white mb-6">{t('home.trace_title')}</h2>
                            <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                                {t('home.trace_desc')}
                            </p>
                            <img alt="Coffee Map" className="w-full rounded-lg opacity-80 filter sepia grayscale hover:grayscale-0 transition-all duration-500 shadow-xl border border-gray-200 dark:border-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO5Q1YykryEvYoIHTpXI7jpv2OrcvGw4-J2vABWKMo6aSE5H6muzX7eBmpkE36f9yXBODbF-85LO2AbBB-Qw1iyOgWtjOK0FW16Vfo5uN0xWn8tHSAms_Rb-MoSZM3-hhX1P6ijvYh6JPtbLlSAYOtLJpnVmrDePvopUPIqzfc7eiuP4J40jxnUxVUMNHE3wTfDrmapj3Ko9msvwaPD2RrUw4oz10YE_Y1CMSv8clYJvxmzwjzM76zDzliifEFBbrVkardtyl1B1Wn"/>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-primary/20 bg-surface-light dark:bg-surface-dark shadow-2xl">
                                <div className="p-8 border-b md:border-b-0 md:border-r border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.producer')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Luis Rodriguez</p>
                                </div>
                                <div className="p-8 border-b border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.region')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Minca, Sierra Nevada</p>
                                </div>
                                <div className="p-8 border-b md:border-b-0 md:border-r border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.altitude')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">1,850 MASL</p>
                                </div>
                                <div className="p-8 border-b border-primary/20 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.roast_date')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Oct 24, 2023</p>
                                </div>
                                <div className="p-8 md:col-span-2 hover:bg-primary/5 transition-colors">
                                    <h4 className="font-accent text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('home.variety')}</h4>
                                    <p className="font-display text-2xl text-gray-900 dark:text-white">Castillo, Caturra</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;