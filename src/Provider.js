import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from './App';
import {AuthProvider} from './Auth/AuthContext';
import Login from './Auth/Login';
import Header from './Elements/Header';
//import Signup from './Auth/Signup';


const Provider = () => {
    return (
        <>
        <Router>
            <AuthProvider>
                <Header />
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        {/*<Route path="/signup" element={<Signup />}/>*/}
                    </Routes>
                <App />
            </AuthProvider>
        </Router>
        </>
    );
};

export default Provider;