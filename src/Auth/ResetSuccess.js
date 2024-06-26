import React from 'react';
import {Link} from 'react-router-dom';

const ResetSuccess = () => {

    return (
        <>
        <div className="container d-flex p-5 justify-content-center text-light">
            <h5>Password has been reset. Please <Link to="/login">login</Link> with the new password.</h5>
        </div>
        </>
    );
}

export default ResetSuccess