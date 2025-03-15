import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import UploadPage from './views/UploadPage';
import Navbar from './components/Navbar';
function App() {
    return (
        <AuthProvider>
            <Router>     
            <Navbar/>               
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
