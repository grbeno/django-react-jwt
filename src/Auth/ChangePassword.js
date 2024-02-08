import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';


const ChangePassword = () => {
    
    const {change} = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        change(e, (errorMessage) => {
            setError(errorMessage);
        });
    };

    return (
        <>
        <div className="container d-flex mt-3 justify-content-center">
            <form onSubmit={handleChange}>
                <div className='p-2'><input className='p-2 text-center rounded' type="text" name="old_password" placeholder="old_password"/></div>
                <div className='p-2'><input className='p-2 text-center rounded' type="text" name="new_password" placeholder="new_password"/></div>
                <div className='p-2'><input className='p-2 text-center rounded' type="text" name="new_password2" placeholder="new_password2"/></div>
                <div className='d-flex p-2 pb-4 justify-content-center'><input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Change"/></div>         
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
};

export default ChangePassword;