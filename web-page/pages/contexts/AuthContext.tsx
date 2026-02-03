
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    loading: true,
    refreshAuth: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkUserRole = async (currentUser: User | null) => {
        if (!currentUser) {
            setIsAdmin(false);
            return;
        }
        // Timeout protection: If DB doesn't answer in 3s, assume user is NOT admin initially
        try {
            const adminPromise = authService.checkIsAdmin(currentUser.id);
            const timeoutPromise = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 3000));

            const adminStatus = await Promise.race([adminPromise, timeoutPromise]);
            setIsAdmin(adminStatus);
        } catch (e) {
            console.error("Role check failed", e);
            setIsAdmin(false);
        }
    };

    const refreshAuth = async () => {
        // Don't set global loading to true on manual refresh to avoid UI flickering/blocking
        // setLoading(true); 
        try {
            const currentUser = await authService.getUser();
            setUser(currentUser);
            // We await this, but now it has a timeout protection inside
            await checkUserRole(currentUser);
        } catch (error) {
            console.error("Error refreshing auth:", error);
            setUser(null);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial check
        refreshAuth();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth event:", event);
            if (session?.user) {
                setUser(session.user);
                await checkUserRole(session.user);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
