import React, {useState, useContext, useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
import AuthContext from "./AuthContext";

const DeleteUser = () => {

    const {deleteuser} = useContext(AuthContext);
    // token and user
    const token = localStorage.getItem('access_token');
    const user = token ? jwtDecode(token) : '';
    const [error, setError] = useState("");

    const handleDeleteUser = () => {
        deleteuser((errorMessage) => {
            setError(errorMessage);
        },
        user.user_id,
        );
    }
    
    useEffect(() => {
        console.log(user);
        handleDeleteUser();
    }, []);

   return (
        <>
        <div className="container d-flex p-4 justify-content-center">
            <p>User-{user.user_id} is deleted.</p>
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
}

export default DeleteUser