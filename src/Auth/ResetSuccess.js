import React from 'react'
import {Link} from 'react-router-dom'

const ResetSuccess = () => {

    return (
        <>
        <div className="container d-flex p-4 justify-content-center">
            <p>Password has been reset. Please <Link to="/login">login</Link> with the new password.</p>
        </div>
        </>
    );
}

export default ResetSuccess