import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';
import '../App.css';
import axiosInstance from '../axios';


const Header = () => {

    const {logout} = useContext(AuthContext)
    const token = localStorage.getItem('access_token');
    const [superuser, setSuperuser] = useState(false);

    const handleLogout = () => {
        logout();
    };

    // Check if the user is superuser
    const isSuperuser = () => {
        axiosInstance.get('accounts/is_superuser/', ).then(res => {
            setSuperuser(res.data.is_superuser);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        isSuperuser();
    }, []);

    return(
        <header>
            <nav className="navbar navbar-expand-md m-0 border-bottom shadow-sm" style={{background: 'black'}}>
                <a className="menu-link navbar-brand px-4 mr-auto text-light" href='/'><span data-toggle="tooltip" title="home"><i className="fa-solid fa-house"></i></span></a>
                <>
                {token ? (
                    <span className="offbutton h5 m-4 text-light d-block" onClick={handleLogout}><span data-toggle="tooltip" title="logout"><i className="fa-solid fa-power-off"></i></span></span>
                ) : (
                    <div>
                        <Link to="/login"><span className="h5 text-light" data-toggle="tooltip" title="login"><i className="mx-2 fa-solid fa-user"></i></span></Link>
                    </div>
                )}
                </>
                {superuser && process.env.REACT_APP_BASE_URL==='http://localhost:8000' && <a className="h5 m-4 d-none d-md-block text-light" href="http://localhost:8000/admin/"><span data-toggle="tooltip" title="django-admin"><i className="top-icon fa-solid fa-id-card-clip"></i></span></a>}
            </nav>
        </header>
    )
}

export default Header