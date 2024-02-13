import React, {useContext, useState} from 'react'
import AuthContext from "./AuthContext";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const SetNew = () => {

    const {setnew} = useContext(AuthContext);
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

    const handleSetNew = (e) => {
        e.preventDefault();
        setnew(e, (errorMessage) => {
            setError(errorMessage);
        });
    };

    return (
        <>
        <div className="container d-flex p-4 justify-content-center">
            <form onSubmit={handleSetNew}>
                <div className='p-2'>
                    <input className='p-2 text-center rounded' type={type} onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="password"/>
                        <span class="flex justify-around items-center" onClick={handleShowPassword}>
                            <Icon class="absolute pl-2" icon={icon} size={15}/>
                        </span>
                    </div>
                    <div className='p-2'>
                        <input className='p-2 text-center rounded' type={type} onChange={(e) => setPassword2(e.target.value)} value={password2} name="password2" placeholder="password again"/>
                    </div>
                <div className='d-flex p-2 pb-4 justify-content-center'>
                    <input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Send"/>
                </div>
            </form>  
        </div>
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

export default SetNew