import { createClient } from '@supabase/supabase-js';
import type { Language } from '../types';

// Public placeholder Supabase credentials.
// These are safe to be exposed in a client-side application.
const supabaseUrl = 'https://plgztvfrwswyflxlhtwg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZ3p0dmZyd3N3eWZseGxodHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NjM5OTIsImV4cCI6MjAzNDE1Njk5Mn0.SgG2v4EMJ43_12n_Kz4B5p2wrj45dx2o-30zU6F5z5E';

// Explicitly set headers to potentially resolve network/CORS issues that can cause "Failed to fetch" errors.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
        }
    }
});


const DEVICE_ID_KEY = 'sena-device-id';

export const getDeviceId = (): string => {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
};

export interface UserPreferences {
    language: Language;
    is_dark_mode: boolean;
}

export const getUserPreferences = async (deviceId: string): Promise<UserPreferences | null> => {
    const { data, error } = await supabase
        .from('user_preferences')
        .select('language, is_dark_mode')
        .eq('device_id', deviceId)
        .single();

    if (error) {
        // 'PGRST116' is the code for "No rows found". This is an expected case for new users, not an error.
        if (error.code !== 'PGRST116') {
             console.error('Error fetching user preferences:', error.message);
        }
        return null;
    }
    
    return {
        language: data.language as Language,
        is_dark_mode: data.is_dark_mode,
    };
};

export const saveUserPreferences = async (deviceId: string, preferences: Partial<UserPreferences>): Promise<void> => {
    // This will create the row if it doesn't exist, or update it if it does.
    const { error } = await supabase
        .from('user_preferences')
        .upsert({ device_id: deviceId, ...preferences });

    if (error) {
        console.error('Error saving user preferences:', error.message);
    }
};