import React, {useContext, useState, useEffect} from 'react'
import AuthContext from "./AuthContext";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const SetNew = () => {

    const {setnew} = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(eyeOff);
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

    const handleSetNew = (e) => {
        e.preventDefault();
        setnew(e, (errorMessage) => {
            setError(errorMessage);
        },
        token,
        );
    };

    useEffect(() => {
        const url = window.location.href;
        const token = url.split('/').pop();
        setToken(token);
    }, []);

    return (
        <>
        <div className="container d-flex p-4 justify-content-center">
            <form className='auth-form' onSubmit={handleSetNew}>
            <fieldset>
                <legend>Set new Password</legend>
                <hr className='bg-light'/>
                <div className='p-2 position-relative'>
                    <input className='p-2 text-center rounded form-control' type={type} onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="password"/>
                        <span class="eye-icon position-absolute top-50 end-0 translate-middle-y pe-2" onClick={handleShowPassword}>
                            <Icon icon={icon} size={13}/>
                        </span>
                </div>
                <div className='d-flex p-2 pb-4 justify-content-center'>
                    <input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Send"/>
                </div>
            </fieldset>
            </form>  
        </div>
        {error && 
            <div className="d-flex mt-3 justify-content-center">
                <h6 className="p-4 text-danger rounded">
                    <i className="sign-icon fa-solid fa-triangle-exclamation mx-3"></i>
                    {error}
                </h6>
            </div>
        }
        </>
    );
}

export default SetNew