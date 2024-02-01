import React, {useContext, useState} from 'react'
import AuthContext from "./AuthContext";


const Login = () => {

    const {login} = useContext(AuthContext);
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        login(e, (errorMessage) => {
            setError(errorMessage);
        });
    };

    return (
        <>
        {!token &&
            <div className="container d-flex p-4 justify-content-center">
                <form onSubmit={handleLogin}>
                    <div className='p-2'><input className='p-2 text-center rounded' type="text" name="username" placeholder="Enter your username"/></div>
                    <div className='p-2'><input className='p-2 text-center rounded' type="password" name="password" placeholder="Enter your password"/></div>
                    <div className='d-flex p-2 pb-4 justify-content-center'><input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Login"/></div>
                    <p>Not signed up yet?<a href="/signup"> Signup</a></p>
                </form>  
            </div>
        }
        {error && 
            <div className="d-flex mt-3 justify-content-center">
                <h5 className="p-4 text-danger rounded" style={{backgroundColor: '#f4c0c0'}}>
                    <i className="sign-icon fa-solid fa-triangle-exclamation mx-3"></i>
                    {error}
                </h5>
            </div>
        }
        </>
    );
}

export default Login