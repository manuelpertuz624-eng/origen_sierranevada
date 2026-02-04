import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { emailService } from '../services/emailService';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // Visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Success state for showing confirmation message
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (pass: string) => {
        const minLength = pass.length >= 8;
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

        return {
            isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
            requirements: { minLength, hasUpper, hasLower, hasNumber, hasSpecial }
        };
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validaciones de seguridad avanzada
        const passwordCheck = validatePassword(formData.password);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (!passwordCheck.isValid) {
            setError('La contraseña no cumple con los estándares de seguridad requeridos.');
            return;
        }

        setLoading(true);

        const { error: signUpError } = await authService.signUp(
            formData.email,
            formData.password,
            formData.fullName,
            formData.phone
        );

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        // Send Welcome Email (async, don't block UI)
        emailService.sendWelcomeEmail(formData.email, formData.fullName).catch(console.error);

        // Notify Admin of new registration (optional)
        emailService.sendOrderNotification('origensierranevadasm@gmail.com', {
            type: 'NUEVO_REGISTRO',
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
        }).catch(console.error);

        // Registro exitoso
        setSuccess(true);
        setLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
                <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-md border border-[#C5A065]/20 p-10 rounded-2xl shadow-[0_0_50px_rgba(197,160,101,0.1)] text-center">
                    <div className="mb-6 inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                        <span className="material-icons-outlined text-4xl">check_circle</span>
                    </div>

                    <h2 className="font-display text-3xl text-white mb-4">¡Registro Recibido!</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Es un placer tenerte con nosotros en <span className="text-[#C5A065] font-bold">Origen Sierra Nevada</span>.
                        <br /><br />
                        Para mantener la exclusividad y calidad de nuestra comunidad, tu solicitud ha pasado a nuestra <span className="text-[#C5A065]">Fase de Bienvenida y Autorización</span>.
                        <br /><br />
                        Te enviaremos un correo electrónico en cuanto tu perfil haya sido habilitado para iniciar el ritual de la mejor experiencia cafetera.
                    </p>

                    <Link
                        to="/login"
                        className="inline-block w-full bg-[#C5A065] text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-[#D4B075] transition-colors"
                    >
                        Ir a Iniciar Sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 pt-20 px-4">
            <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-md border border-[#C5A065]/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(197,160,101,0.1)]">

                <div className="text-center mb-8">
                    <div className="inline-block relative mb-4">
                        <img src="/logo-completo.svg" alt="Origen Sierra Nevada" className="h-24 w-auto mx-auto object-contain drop-shadow-[0_0_25px_rgba(197,160,101,0.3)] brightness-110" />
                    </div>
                    <h2 className="font-display text-2xl text-white mb-2 tracking-wide">Únete al Origen</h2>
                    <p className="text-white/60 text-sm font-light">Crea tu cuenta y reencuentrate con tu Origen.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Nombre Completo */}
                    <div>
                        <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2 ml-1">Nombre Completo</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A065] focus:ring-1 focus:ring-[#C5A065] transition-all"
                            placeholder="Ej: Juan Pérez"
                            required
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2 ml-1">Teléfono Móvil</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A065] focus:ring-1 focus:ring-[#C5A065] transition-all"
                            placeholder="+57 300 123 4567"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C5A065] focus:ring-1 focus:ring-[#C5A065] transition-all"
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>

                    {/* Contraseñas en Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2 ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C5A065] focus:ring-1 focus:ring-[#C5A065] transition-all pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    tabIndex={-1}
                                >
                                    <span className="material-icons-outlined text-lg">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#C5A065] text-xs uppercase tracking-widest font-bold mb-2 ml-1">Confirmar</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C5A065] focus:ring-1 focus:ring-[#C5A065] transition-all pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    tabIndex={-1}
                                >
                                    <span className="material-icons-outlined text-lg">
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Password Strength Checklist */}
                    {formData.password && (
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                            <p className="text-[10px] text-[#C5A065] uppercase tracking-[0.2em] font-bold mb-2">Seguridad del Ritual</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                {[
                                    { key: 'minLength', label: '8+ Caracteres' },
                                    { key: 'hasUpper', label: 'Mayúscula' },
                                    { key: 'hasLower', label: 'Minúscula' },
                                    { key: 'hasNumber', label: 'Número' },
                                    { key: 'hasSpecial', label: 'Especial (@#$)' }
                                ].map((req) => {
                                    const isDone = validatePassword(formData.password).requirements[req.key as keyof ReturnType<typeof validatePassword>['requirements']];
                                    return (
                                        <div key={req.key} className="flex items-center gap-2">
                                            <span className={`material-icons-outlined text-[12px] transition-colors ${isDone ? 'text-green-500' : 'text-white/20'}`}>
                                                {isDone ? 'check_circle' : 'circle'}
                                            </span>
                                            <span className={`text-[10px] tracking-wide transition-colors ${isDone ? 'text-white/90' : 'text-white/30'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Legal Checkbox */}
                    <div className="flex items-start gap-3 mt-4 mb-6">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            required
                            className="mt-1 w-4 h-4 rounded bg-black/40 border-white/10 text-[#C5A065] focus:ring-[#C5A065] focus:ring-offset-0 cursor-pointer accent-[#C5A065]"
                        />
                        <label htmlFor="acceptTerms" className="text-xs text-gray-400 leading-relaxed">
                            Acepto los <a href="#" className="text-[#C5A065] hover:underline">Términos y Condiciones</a>, la <a href="#" className="text-[#C5A065] hover:underline">Política de Privacidad</a> y autorizo el <a href="#" className="text-[#C5A065] hover:underline">Tratamiento de mis Datos Personales</a> conforme a la Ley y el marco legal internacional.
                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#C5A065] to-[#AA771C] text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:shadow-[0_0_20px_rgba(197,160,101,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center border-t border-white/5 pt-6">
                    <p className="text-white/40 text-sm">
                        ¿Ya tienes cuenta?{' '}
                        <button onClick={() => navigate('/login')} className="text-[#C5A065] font-bold hover:text-white transition-colors underline decoration-[#C5A065]/50 hover:decoration-white">
                            Inicia Sesión
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
