import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/axios';

interface AuthContextType {
    user: any | null;
    isLoading: boolean;
    login: (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getCookie = (name:string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const setCsrfToken = async () => {
        try {
            if (!getCookie('XSRF-TOKEN')) {
                await api.get('/auth/csrf-token');
            }
        } catch (err) {
            console.error('Failed to set CSRF token:', err);
        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await setCsrfToken();
                const profileResponse = await api.get('/auth/profile');
                setUser(profileResponse.data);
            } catch (err: any) {
                console.log('status',err.response?.status);
                if (err.response?.status !== 401) {
                    console.error('Security Initialization failed:', err);
                }
                setUser(null);
            } finally {
                setIsLoading(false);
            }
    };

    initializeApp();
    }, []);

    const login = (userData: any) => setUser(userData);
    const logout = async () => {
        try {
            await api.post('/auth/logout');
            await setCsrfToken();
        } catch (err) {
            console.error('Logout failed on server', err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};