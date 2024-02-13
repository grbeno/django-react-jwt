import React, {useContext, useEffect, useState} from 'react'
import AuthContext from "./AuthContext";


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
            <form onSubmit={handleReset}>
                <div className='p-2'>
                    <input className='p-2 text-center rounded' type="text" name="email" placeholder="email"/>
                </div>
                <div className='d-flex p-2 pb-4 justify-content-center'>
                    <input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Send"/>
                </div>
            </form>  
        </div>
        {success && 
            <div className="d-flex mt-3 justify-content-center">
                <h5 className="p-4 text-light rounded" style={{backgroundColor: '#00cc00'}}>
                    <i className="sign-icon fa-solid fa-circle-check mx-3"></i>
                    {success}
                </h5>
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

export default Reset