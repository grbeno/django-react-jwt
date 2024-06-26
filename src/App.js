import React, {useEffect, useRef, useState, useContext} from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import {expirationTime} from './utils';
import AuthContext from './Auth/AuthContext';
import axiosInstance from './axios';
import withAuth from './LoginRequired';
import { useNavigate } from 'react-router-dom';


const App = () => {

  const {deleteUser} = useContext(AuthContext);
  
  // token
  const token = localStorage.getItem('access_token');
  const user = token ? jwtDecode(token) : '';
  const expirationTimeRefAccess = useRef(expirationTime('access_token'));
  const expirationTimeRefRefresh = useRef(expirationTime('refresh_token'));

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    
    const userConfirmation = window.confirm("Are you sure? This action cannot be undone. The user will be deleted.");
    
    if (!userConfirmation) {
        return; // If the user clicks "Cancel", stop the function
    }
    
    try {
        await deleteUser((errorMessage) => {
            setError(errorMessage);
        }, user.user_id);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axiosInstance.defaults.headers['Authorization'];
    } catch (error) {
        console.error(error);
    }
  }

  // useEffect for tokens
  useEffect(() => {
    console.log(expirationTimeRefAccess);
    console.log(expirationTimeRefRefresh);
    if (!token && window.location.pathname === '/') {
      navigate('/login');
    }
  } , [expirationTimeRefAccess, expirationTimeRefRefresh, navigate, token]);

  return (
    <>
    {token && window.location.pathname === '/' &&
      <div className="App">
      
      <div className="d-flex m-3 mt-0 justify-content-center">
        <div className="d-flex p-3 col-12 col-xl-6 border-bottom justify-content-between">
          <h3 className="float-left text-light">Hello, {user.username}</h3>
          <div></div>
          <div>
            <a href="/change"><span className="h5 text-info" data-toggle="tooltip" title="change password"><i className="fa-solid fa-key mx-2"></i></span></a>
            <button onClick={handleDeleteUser} className='bg-transparent border-0'><span className="h5 text-danger" data-toggle="tooltip" title="delete user"><i className="fa-solid fa-user-xmark mx-2"></i></span></button>
          </div>
        </div>
      </div>
      
      <div className="d-flex m-3 justify-content-center">
        <div className="card col-12 col-xl-6 text-light" style={{background: '#1e383d'}}>
          <ul className="p-3 m-3" style={{ listStyleType: 'none', textAlign: 'left' }}>
            <li className="bg-transparent text-light ">Access Token Expiration Time: {expirationTimeRefAccess.current}</li>
            <li className="bg-transparent text-light ">Refresh Token Expiration Time: {expirationTimeRefRefresh.current}</li>
          </ul>
        </div>
      </div>
      
      <div className="d-flex m-3 justify-content-center">
        <div className="d-flex p-3 col-12 col-xl-6 border-bottom justify-content-between">
          <h3 className="float-left text-light">Content</h3>
        </div>
      </div>

      <div className="d-flex m-0 m-xl-3 justify-content-center">
        <div className="card col-12 col-xl-6 bg-transparent text-light">
          <ul className="p-3 m-0 m-xl-3" style={{ listStyleType: 'none', textAlign: 'left', fontSize: '20px' }}>
            <li className="p-3 m-2 bg-dark text-light ">Empty project</li>
            <li className="p-3 m-2 bg-dark text-light ">Empty project</li>
            <li className="p-3 m-2 bg-dark text-light ">Empty project</li>
            <li className="p-3 m-2 bg-dark text-light ">Empty project</li>
          </ul>
        </div>
      </div>

    </div>  
    }
    {error && 
      <div className="d-flex mt-3 justify-content-center">
        <h5 className="p-4 rounded text-danger" style={{backgroundColor: '#f4c0c0'}}>
            <i className="sign-icon fa-solid fa-triangle-exclamation mx-3"></i>
            {error}
        </h5>
      </div>
    }
    </>
  );
}

export default withAuth(App);
