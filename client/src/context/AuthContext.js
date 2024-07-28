import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getProfile } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getProfile()
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        };
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};