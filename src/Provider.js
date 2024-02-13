import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './Auth/AuthContext';
import App from './App';
import Login from './Auth/Login';
import Header from './Elements/Header';
import Signup from './Auth/Signup';
import ChangePassword from './Auth/ChangePassword';
import ResetPassword from './Auth/ResetPassword';
import SetNew from './Auth/SetNewPassword';


const Provider = () => {
    return (
        <>
        <Router>
            <AuthProvider>
                <Header />
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/signup" element={<Signup />}/>
                        <Route path="/change" element={<ChangePassword />}/>
                        <Route path="/reset" element={<ResetPassword />}/>
                        <Route path="/setnew" element={<SetNew />}/>
                    </Routes>
                <App />
            </AuthProvider>
        </Router>
        </>
    );
};

export default Provider;