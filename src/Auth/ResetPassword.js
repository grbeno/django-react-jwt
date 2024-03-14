import React, {useContext, useEffect, useState} from 'react'
import AuthContext from "./AuthContext"
import {Icon} from 'react-icons-kit'
import {mail} from 'react-icons-kit/feather/mail'

const Reset = () => {

    const {reset} = useContext(AuthContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReset = (e) => {
        e.preventDefault();
        reset(e,
            (errorMessage) => { setError(errorMessage); }, 
            (successMessage) => { setSuccess(successMessage); 
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
            setSuccess("");
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, success]);

    return (
        <>
        <div className="container d-flex p-4 justify-content-center">
            <form className='auth-form' onSubmit={handleReset}>
            <fieldset>
                <legend>New password
                    <span className='text-light mx-2'>
                        <Icon style={{transform: "translateY(-5%)"}} icon={mail} size={20}/>
                    </span>
                </legend>
                <hr className='bg-light'/>
                <div className='p-2'>
                    <input className='p-2 text-center rounded' type="text" name="email" placeholder="email"/>
                </div>
                <div className='d-flex p-2 pb-4 justify-content-center'>
                    <input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Send"/>
                </div>
                <div className='d-flex pb-4 justify-content-center'>
                    <div className='d-block text-light'>
                        <hr className='bg-light'/> 
                        <p>Type your email address!</p>
                    </div>
                </div>
            </fieldset>
            </form>  
        </div>
        {success && 
            <div className="d-flex mt-3 justify-content-center">
                <h6 className="p-4 text-light rounded">
                    <i className="sign-icon fa-solid fa-circle-check mx-3"></i>
                    {success}
                </h6>
            </div>
        }
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

export default Reset