import React, { createContext } from "react";
import axiosInstance from "../axios";


export const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({children}) => {

    // signup
    const signup = (e, errorCallback) => {
        e.preventDefault();
        axiosInstance.post('accounts/signup/', {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
        })
        .then((response) => {
            console.log(response);
            window.location.href = '/login';
        })
        .catch((error) => {
            errorCallback(`[ ${error.response.data.affected_field} ] ${error.response.data.error_message}`);  // "Already existed username or bad password! Try again."
            console.log(`${error}: ${error.response.data.error_message}`);
        });
    };
    
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
            //window.location.reload();
            window.location.href = '/';
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
            window.location.href = 'login/';
        });
    };

    // change password
    const change = (e, errorCallback) => {
        e.preventDefault();
        axiosInstance.post('accounts/change_password/', {
            old_password: e.target.old_password.value,
            new_password: e.target.new_password.value,
            new_password2: e.target.new_password2.value,
        })
        .then((response) => {
            logout();
        })
        .catch((error) => {
            errorCallback(`[ ${error.response.data.affected_field} ] ${error.response.data.error_message}`);
            console.log(`${error}: ${error.response.data.error_message}`);
        });
    };

    const reset = (e, errorCallback, successCallback) => {
        e.preventDefault();
        axiosInstance.post('api/password_reset/', {
            email: e.target.email.value,
        })
        .then((response) => {
            successCallback(`${response.data.message}`);
            console.log(response);
        })
        .catch((error) => {
            errorCallback(`${error.response.data.error_message}`);
            console.log(`${error}: ${error.response.data.error_message}`);
        });
    };
    
    const setnew = (e, errorCallback, token) => {
        e.preventDefault();
        axiosInstance.post(`/api/password_reset/confirm/`, { 
            password: e.target.password.value,
            token,
        })
        .then((response) => {
            console.log(response);
            // message: "Password has been set."
            window.location.href = '/login/';
        })
        .catch((error) => {
            // errorCallback(`${error.response.data.error_message}`);
            // console.log(`${error}: ${error.response.data.error_message}`);
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const errors = error.response.data;
                for (const field in errors) {
                    for (const problem of errors[field]) {
                        errorCallback(`${field}: ${problem}`);
                    }
                }
            } else if (error.request) {
                // The request was made but no response was received
                errorCallback('The request was made but no response was received');
            } else {
                // Something happened in setting up the request that triggered an Error
                errorCallback('Error: ' + error.message);
            }
        });
    };

    const contextData = {signup, login, logout, change, reset, setnew};
      
    return (
        <>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        </>
    );
}
