import React, {useContext, useState} from 'react'
import AuthContext from "./AuthContext";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const Login = () => {

    const {login} = useContext(AuthContext);
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(eyeOff);
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');

    const handleLogin = (e) => {
        e.preventDefault();
        login(e, (errorMessage) => {
            setError(errorMessage);
        });
    };

    // show-hide password
    const handleShowPassword = () => {
        if (type === 'password') {
            setType('text');
            setIcon(eye);
        } else {
            setType('password');
            setIcon(eyeOff);
        }
    }

    return (
        <>
        {!token &&
            <div className="container d-flex p-4 justify-content-center">
                <form onSubmit={handleLogin}>
                    <div className='p-2'>
                        <input className='p-2 text-center rounded' type="text" name="username" placeholder="Enter your username"/>
                    </div>
                    <div className='p-2 flex'>
                        <input className='p-2 text-center rounded' type={type} onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Enter your password"/>
                        <span class="flex justify-around items-center" onClick={handleShowPassword}>
                            <Icon class="absolute pl-2" icon={icon} size={15}/>
                        </span>
                    </div>
                    <div className='d-flex p-2 pb-4 justify-content-center'>
                        <input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Login"/>
                    </div>
                    <div className='d-flex pb-4 justify-content-center'>
                        <div className='d-block'> 
                            <p>Not signed up yet?<a href="/signup"> Signup</a></p>
                            <p>Forgotten password?<a href="/reset"> Reset</a></p>
                        </div>
                    </div>
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