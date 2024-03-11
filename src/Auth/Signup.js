import React, {useContext, useState} from 'react'
import AuthContext from "./AuthContext";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const Signup = () => {

    const {signup} = useContext(AuthContext);
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(eyeOff);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [type, setType] = useState('password');

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

    const handleSignup = (e) => {
        e.preventDefault();
        signup(e, (errorMessage) => {
            setError(errorMessage);
        });
    };

    return (
        <>
        {!token &&
            <div className="container d-flex mt-3 justify-content-center">
                <form className="auth-form" onSubmit={handleSignup}>
                <fieldset>
                    <legend>Signup</legend>
                    <hr className='bg-light'/>
                    <div className='p-2'>
                        <input className='p-2 text-center rounded form-control' type="text" name="username" placeholder="username"/>
                    </div>
                    <div className='p-2'>
                        <input className='p-2 text-center rounded form-control' type="text" name="email" placeholder="email"/>
                    </div>
                    <div className='p-2 position-relative'>
                        <input className='p-2 text-center rounded form-control' type={type} onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="password"/>
                        <span className="eye-icon position-absolute top-50 end-0 translate-middle-y pe-2" onClick={handleShowPassword}>
                            <Icon icon={icon} size={13}/>
                        </span>
                    </div>
                    <div className='p-2 position-relative'>
                        <input className='p-2 text-center rounded form-control' type={type} onChange={(e) => setPassword2(e.target.value)} value={password2} name="password2" placeholder="password again"/>
                    </div>
                    <div className='d-flex p-2 justify-content-center'>
                        <input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Signup"/>
                    </div>
                </fieldset>
                </form>
            </div>
        }
        {error &&
            <>
            <div className="d-flex mt-3 justify-content-center">
                <h5 className="p-4 text-danger rounded" style={{backgroundColor: '#f4c0c0'}}>
                    <i className="sign-icon fa-solid fa-triangle-exclamation mx-3"></i>
                    {error}
                </h5>
            </div>
            </>
        }
        <div className='d-flex pb-4 justify-content-center'>
            <div className='d-block text-light'>
                <ul class="h6 text-warning">
                    <li class="mt-4 mb-2">Your password must contain at least 8 characters.</li>
                    <li class="mb-2">Your password must contain at least one number.</li>
                    <li class="mb-2">Your password must contain at least one uppercase letter.</li>
                    <li class="mb-4">Your password must contain only alphanumeric characters.</li>
                </ul>
            </div>
        </div>
        </>
    );
}

export default Signup