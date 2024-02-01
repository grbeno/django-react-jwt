import React, {useEffect, useRef} from 'react';
import './App.css';
import {expirationTime} from './utils';


const App = () => {

  // token
  const token = localStorage.getItem('access_token');
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
        <h2>Hello React!</h2>
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
