import { supabase } from './supabaseClient';

export const emailService = {
    sendWelcomeEmail: async (email: string, fullName: string) => {
        try {
            const { data, error } = await supabase.functions.invoke('send-email', {
                body: {
                    to: email,
                    subject: '🌿 Bienvenido al Ritual: Origen Sierra Nevada',
                    html: `
                        <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #C5A065; padding: 20px; border-radius: 10px;">
                            <h2 style="color: #C5A065;">¡Hola, ${fullName}!</h2>
                            <p>Es un placer darte la bienvenida a nuestra comunidad exclusiva. Has dado el primer paso para reecontrarte con tu Origen.</p>
                            <p>Tu solicitud de membresía ha sido recibida y está siendo procesada por nuestro equipo de curaduría.</p>
                            <div style="background: #f9f8f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <p style="margin: 0; font-weight: bold; color: #C5A065;">Próximos Pasos:</p>
                                <ul style="margin: 10px 0;">
                                    <li>Validación de datos de contacto.</li>
                                    <li>Habilitación de acceso al panel de beneficios.</li>
                                    <li>Notificación vía email en las próximas 24-48 horas.</li>
                                </ul>
                            </div>
                            <p>Mientras tanto, te invitamos a explorar nuestra <a href="https://origen2025.share.zrok.io/guide" style="color: #C5A065;">Guía de Preparación</a> para que estés listo para el ritual.</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                            <p style="font-size: 12px; color: #888; text-align: center;">© 2026 Origen Sierra Nevada SM. Todo el café que amas, desde el corazón de la montaña.</p>
                        </div>
                    `
                }
            });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error in sendWelcomeEmail:', error);
            return { success: false, error };
        }
    },

    sendOrderNotification: async (adminEmail: string, details: any) => {
        try {
            const { data, error } = await supabase.functions.invoke('send-email', {
                body: {
                    to: adminEmail,
                    subject: '🔔 Alerta: Nueva Actividad en Origen SNSM',
                    html: `
                        <div style="font-family: sans-serif; color: #1a1a1a; padding: 20px;">
                            <h2 style="color: #C5A065;">Notificación de Sistema</h2>
                            <p>Se ha registrado un nuevo evento que requiere tu atención:</p>
                            <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${JSON.stringify(details, null, 2)}</pre>
                            <p><a href="https://origen2025.share.zrok.io/admin" style="color: #C5A065; font-weight: bold;">Ir al Panel de Administración →</a></p>
                        </div>
                    `
                }
            });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error in sendOrderNotification:', error);
            return { success: false, error };
        }
    }
};
