
// import { Resend } from 'resend'; // DO NOT USE Node SDK in browser
// Using a mock or a direct fetch to bypass Node.js dependencies in the browser build

export const emailService = {
    sendWelcomeEmail: async (email: string, fullName: string) => {
        console.log(`[MOCK EMAIL] To: ${email}, Subject: Siente la Esencia de la Sierra, Content: Welcome ${fullName}`);
        // In a real production environment, this should be called from a server-side route or Edge Function
        // to keep the API Key secure and avoid Node.js browser compatibility issues.
        return { success: true, data: { id: 'mock-id' } };
    },

    sendOrderNotification: async (adminEmail: string, orderDetails: any) => {
        console.log(`[MOCK EMAIL] To Admin: ${adminEmail}, Subject: Notificación de Actividad, Details:`, orderDetails);
        return { success: true, data: { id: 'mock-admin-id' } };
    }
};
