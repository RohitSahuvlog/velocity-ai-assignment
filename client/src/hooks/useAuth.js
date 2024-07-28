import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [authError, setAuthError] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/users/login', { email, password });
            return response.data;
        } catch (error) {
            setAuthError(error.response.data.message);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/api/users/register', userData);
            return response.data;
        } catch (error) {
            setAuthError(error.response.data.message);
        }
    };

    return { login, register, authError };
};

export default useAuth;
