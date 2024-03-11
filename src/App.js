import React, {useEffect, useRef, useState, useContext} from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import {expirationTime} from './utils';
import {Link} from 'react-router-dom';
import AuthContext from './Auth/AuthContext';


const App = () => {

  const {deleteuser} = useContext(AuthContext);
  
  // token
  const token = localStorage.getItem('access_token');
  const user = token ? jwtDecode(token) : '';
  const expirationTimeRefAccess = useRef(expirationTime('access_token'));
  const expirationTimeRefRefresh = useRef(expirationTime('refresh_token'));

  const [error, setError] = useState("");

  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteuser((errorMessage) => {
        setError(errorMessage);
    },
    user.user_id,
    );
  }

  // useEffect for tokens
  useEffect(() => {
    console.log(expirationTimeRefAccess);
    console.log(expirationTimeRefRefresh);
  } , [expirationTimeRefAccess, expirationTimeRefRefresh]);

  return (
    <>
    {token ? (
      <div className="App">
        <h2>Hello {user.username}!</h2>
        <p>{process.env.REACT_APP_URL}</p>
        <div>
          <Link to="/change"><span className="h5 text-primary"><i className="fa-solid fa-key mx-2 fa-2x"></i></span></Link>
          {/* <Link to={`/delete_user/${user.user_id}`}><span className="h5 text-primary"><i className="fa-solid fa-user-xmark mx-2 fa-2x"></i></span></Link> */}
          <button onClick={handleDeleteUser} className='bg-transparent border-0'><span className="h5 text-primary"><i className="fa-solid fa-user-xmark mx-2 fa-2x"></i></span></button>
        </div>
        <hr />
      </div>
    ) : (
      <div className="App">
        <h6>Not logged in!</h6>
        <hr />
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
