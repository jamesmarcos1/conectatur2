// src/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    // Sempre que o token mudar, buscamos /auth/me
    useEffect(() => {
        if (!token) return setUser(null);
        fetch('http://localhost:8000/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(setUser)
            .catch(() => setUser(parseJwt(token)));
    }, [token]);

    const login = async (username, password) => {
        const res = await fetch('http://localhost:8000/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        });
        if (!res.ok) return false;
        const { access_token } = await res.json();
        localStorage.setItem('token', access_token);
        setToken(access_token);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
