import React, { createContext } from "react";
import axiosInstance from "../axios";


export const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    // signup
    /*
    const signup = (e, errorCallback) => {
        e.preventDefault();
        axiosInstance.post('accounts/signup/', {
            username: e.target.username.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
            //about: e.target.about.value,
        })
        .then((response) => {
            console.log(response);
            window.location.href = '/login';
        })
        .catch((error) => {
            errorCallback('[' + error.response.data.affected_field + ']' + ' ' + error.response.data.error_message);  // "Already existed username or bad password! Try again."
            console.log(error + ': ' + error.response.data.error_message);
        });
    };
    */
    
    // login
    const login = (e, errorCallback) => {
        e.preventDefault();
        axiosInstance.post('/api/token/', {
            username: e.target.username.value,
            password: e.target.password.value 
        })
        .then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
            window.location.reload();  // localhost:3000
        })
        .catch((error) => {
            errorCallback("Wrong username or password! Try again.");
            console.log('Possibly wrong username or password: ' + error);
        });
    };

    // logout
    const logout = () => {
        // blacklist token
        axiosInstance.post('/api/token/blacklist/', {
            "refresh_token": localStorage.getItem('refresh_token')
        })
        .then((response) => {
            console.log(response);
            // remove tokens
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete axiosInstance.defaults.headers['Authorization'];
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
             window.location.href = '/login';
        });
    };

    const contextData = {login, logout}; // signup
      
    return (
        <>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        </>
    );
}
