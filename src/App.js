import React, {useEffect, useRef, useState, useContext} from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import {expirationTime} from './utils';
import AuthContext from './Auth/AuthContext';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const {deleteUser} = useContext(AuthContext);

  const navigate = useNavigate();
  
  // token
  const token = localStorage.getItem('access_token');
  const user = token ? jwtDecode(token) : '';
  const expirationTimeRefAccess = useRef(expirationTime('access_token'));
  const expirationTimeRefRefresh = useRef(expirationTime('refresh_token'));

  const [error, setError] = useState("");

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
    if (!token) {
      navigate('/login');
    }
  } , [expirationTimeRefAccess, expirationTimeRefRefresh, token]);

  return (
    <>
    {token && window.location.pathname === '/' ? (
      <div className="App">
        <div className="d-flex justify-content-center">
          <div className="border border-light w-25 p-4 bg-dark">
            <h2 className="text-light">Hello {user.username}!</h2>
            <hr className='bg-light'/>
            <p>{process.env.REACT_APP_URL}</p>
            <div>
              <a href="/change"><span className="h5 text-info" data-toggle="tooltip" title="change password"><i className="fa-solid fa-key mx-2 fa-2x"></i></span></a>
              <button onClick={handleDeleteUser} className='bg-transparent border-0'><span className="h5 text-danger" data-toggle="tooltip" title="delete user"><i className="fa-solid fa-user-xmark mx-2 fa-2x"></i></span></button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    ) : (
      <div className="App">
        {/*<h6 className='text-light'>Not logged in!</h6>*/}
      </div>
    )}
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

export default App;
