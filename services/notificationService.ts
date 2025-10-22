import { translations } from '../constants';
import type { Language } from '../types';
import { supabase } from './supabaseService';

/**
 * Sends a notification email about a new user.
 * This is a "fire-and-forget" function. It won't block the UI
 * and won't show an error to the user if it fails. It calls a backend service
 * (a Supabase Edge Function) that handles the actual email sending.
 */
export const sendWelcomeNotification = (deviceId: string, language: Language): void => {
    (async () => {
        try {
            const t = translations[language];
            const languageName = { pt: 'Português', en: 'English', es: 'Español' }[language];
            
            // The email content is a notification for the project owner.
            const subject = t.welcomeEmailSubject;
            const body = t.welcomeEmailBody
                .replace('{deviceId}', deviceId)
                .replace('{language}', languageName);

            const payload = {
                subject,
                body,
                language,
                deviceId,
            };
            
            // Use the Supabase client to invoke the edge function.
            // This handles authentication and CORS correctly.
            const { error } = await supabase.functions.invoke('send-welcome-email', {
                body: payload,
            });

            if (error) {
                // If there's an error from the function invocation, throw it to be caught below.
                throw error;
            }

        } catch (error: any) {
            // Log the error for debugging but don't surface it to the user.
            console.error('Failed to send welcome notification:', error.message || error);
        }
    })();
};
