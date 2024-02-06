import React, {useEffect, useRef} from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import {expirationTime} from './utils';


const App = () => {

  // token
  const token = localStorage.getItem('access_token');
  const user = token ? jwtDecode(token) : '';
  const expirationTimeRefAccess = useRef(expirationTime('access_token'));
  const expirationTimeRefRefresh = useRef(expirationTime('refresh_token'));

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
        <hr />
      </div>
    ) : (
      <div className="App">
        <h2>Please, log in!</h2>
        <hr />
      </div>
    )}
    </>
  );
}

export default App;
