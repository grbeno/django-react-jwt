import React, {useContext, useState, useEffect} from 'react'
import AuthContext from "./AuthContext";
import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff';


const SetNew = () => {

    const {setNew} = useContext(AuthContext);
    const [token, setToken] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    /* // show-hide password
    const [passwordType, setPasswordType] = useState({
        password_1: 'password',
        passwordConfirm: 'password',
    });

    // for all input fields
    const handleShowPassword = (field) => {
        setPasswordType({
            ...passwordType,
            [field]: passwordType[field] === 'password' ? 'text' : 'password'
        });
    }; */

     // show-hide password icon
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
   
    // set new password - auth context
    const handleSetNew = (e) => {
        e.preventDefault();
        if (e.target.password1.value !== e.target.password2.value) {
            setError("Passwords do not match");
            return;
        }
        setNew(e, (errorMessage) => {
            setError(errorMessage);
        },
        token,
        );
    };
    
    useEffect(() => {
        setToken(window.location.href.split('/').pop());
    }, [token]);

    return (
        <>
        <div className="container d-flex p-4 justify-content-center">
            <form className='auth-form' onSubmit={handleSetNew}>
            <fieldset>
                <legend>Set new Password</legend>
                <hr className='bg-light'/>
                
                <div className='p-2 position-relative'>
                    <input className='form-control p-2 text-center rounded' type={type} onChange={(e) => setPassword(e.target.value)} value={password1} name="password1" placeholder="password1"/>
                    {/* <span class="eye-icon position-absolute top-50 end-0 translate-middle-y pe-2" onClick={handleShowPassword('password_1')}>
                        <Icon icon={passwordType.password_1 === 'password' ? eyeOff : eye} size={15}/>
                    </span> */}
                    <span class="eye-icon position-absolute top-50 end-0 translate-middle-y pe-2" onClick={handleShowPassword}>
                        <Icon icon={icon} size={13}/>
                    </span>
                </div>
                
                <div className='p-2 position-relative'>
                    <input className='form-control p-2 text-center rounded' type={type} onChange={(e) => setPassword2(e.target.value)} value={password2} name="password2" placeholder="password2"/>
                    {/* <span class="eye-icon position-absolute top-50 end-0 translate-middle-y pe-2" onClick={handleShowPassword('passwordConfirm')}>
                        <Icon icon={passwordType.passwordConfirm === 'password' ? eyeOff : eye} size={15}/>
                    </span> */}
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
                <h6 className="error-message">
                    <i className="sign-icon fa-solid fa-triangle-exclamation h5 mx-2" style={{transform: "translateY(16%)"}}></i>
                    {error}
                </h6>
            </div>
        }
        </>
    );
}

export default SetNew