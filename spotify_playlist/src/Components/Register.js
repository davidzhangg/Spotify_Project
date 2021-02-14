import React, { useState } from 'react'
import axios from 'axios';
import '../Styles/Register.css';
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

const Register = () => {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const register = async () => {
        if (usernameReg.length !== 0 && passwordReg.length !== 0) {
            let response = await axios.post("http://localhost:3001/api/register", {username: usernameReg, password: passwordReg});
            console.log(response)
            document.getElementById('userReg').value = '';
            document.getElementById('passReg').value = '';
        }
    };

    return (
        <div className="auth">
            <Helmet><style>{'body { background-color: #34495e; }'}</style></Helmet>
            <div className="registration">
                <h1 className="reg-header">Registration</h1>
                <label>Username</label>
                <input className="userReg-text" id="userReg" type="text" placeholder="Username" 
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input className="passReg-text" id="passReg" type="text" placeholder="Password" 
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <button className="register-btn" onClick={register}>Register</button>
                <h5 className="or-line">-----------OR-----------</h5>
                <Link to="/" className="go-back">
                    <button className="go-login">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Register
