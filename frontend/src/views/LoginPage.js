// /frontend/src/views/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5050/api/v1/login', {
                email,
                password
            });
    
            console.log("Full Login Response:", response);  // Debug the full response
    
            // Check where the token is in the response
            const token = response.data;
            console.log("Extracted Token:", token);  // Debug the extracted token
    
            if (token) {
                login(token);  // Call login with the token
            } else {
                alert('No token received');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    

    return (
        <div style={{ marginTop: '100px' }}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
