import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { type IUserPayload } from '@my-project/types';
import { api } from '../../api/axios';
import './Login.css';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
    const { user, isLoading, login, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const locationFrom = location.state?.from?.pathname || '/';
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        const body: { username: string; password: string} = {
            username: usernameRef.current?.value || '',
            password: passwordRef.current?.value || ''
        };

        try {
            const response = await api.post('/auth/login', body);
            const userData: IUserPayload = response.data.payload;
            login(userData);
            navigate(locationFrom, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
        }

    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    if (isLoading) return <p>Loading...</p>;

    return <div className="login-page">
        {user ? (
            <form action="none" className="login-form">
                <button type="button" onClick={handleLogout} >Logout</button>
            </form>
        ) : (
            <form action="none" className="login-form">
                <input type="text" placeholder="Username" name="username" ref={usernameRef} />
                <input type="password" placeholder="Password" name="password" ref={passwordRef} />
                <button type="button" onClick={handleLogin} >Login</button>
            </form>
        )}

    </div>
}
