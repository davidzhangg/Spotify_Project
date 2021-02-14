import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import '../Styles/Login.css';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import {Helmet} from "react-helmet";


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '150px',
      width                 : '500px',
    }
  };


const Login = () => {

    let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modalIsOpen, setmodalIsOpen] = useState(false)

    const [loginStatus, setLoginStatus] = useState("");

    const login = async () => {
        let response = await axios.post("http://localhost:3001/api/login", {username: username, password: password});
        setUsername("")
        setPassword("")
        document.getElementById('user').value = '';
        document.getElementById('pass').value = '';
        if (response.data.message) {
            setmodalIsOpen(true)
            setLoginStatus(response.data.message)
        } else if (username.length === 0 && password.length === 0) {
            setmodalIsOpen(true)
            setLoginStatus("Please Enter a valid username and password!")
        } else {
            history.push('/mypage');  
        }
    };

    return (
        <div className="auth">
            <Helmet><style>{'body { background-color: #34495e; }'}</style></Helmet>
            <div className="login">
                <h1 className="login-header">Login</h1>
                <input className="user-text" type="text" id="user" placeholder="Username" 
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input className="password-text" type="password" id="pass" placeholder="Password" 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button className="login-btn" onClick={login}>Login</button>
                <Link to="/register" className="register-link">Don't have an account?</Link>
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={() => setmodalIsOpen(false)}>
                <div className="mod-body">
                    <h1 className="status">{loginStatus}</h1>
                    <button className="close-but" onClick={() => setmodalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}

export default Login;
