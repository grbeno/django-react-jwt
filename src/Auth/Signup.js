import React, {useContext, useState} from 'react'
import AuthContext from "./AuthContext";


const Signup = () => {

    const {signup} = useContext(AuthContext);
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState("");

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
                <form onSubmit={handleSignup}>
                    <div className='p-2'><input className='p-2 text-center rounded' type="text" name="username" placeholder="username"/></div>
                    <div className='p-2'><input className='p-2 text-center rounded' type="text" name="email" placeholder="email"/></div>
                    <div className='p-2'><input className='p-2 text-center rounded' type="password" name="password" placeholder="password"/></div>
                    <div className='p-2'><input className='p-2 text-center rounded' type="password" name="password2" placeholder="password again"/></div>
                    <div className='d-flex p-2 justify-content-center'><input className='p-2 px-3 bg-primary text-light border-0 rounded' type="submit" value="Signup"/></div>   
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
            {/*<div className='d-flex text-warning justify-content-center'>
                <ul>
                <hr />
                    <li>Your password can’t be too similar to your other personal information.</li>
                    <li>Your password must contain at least 8 characters.</li>
                <hr />
                </ul>
            </div>*/}
            </>
        }
        </>
    );
}

export default Signup