import React, { useState } from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FaTimes} from 'react-icons/fa';

export default function Login() {

    const modalStyles = {
        content : {
        top : '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35%',
        height: '35%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        alignItem: 'center',
        justifyContent: 'space-around', 
        display: 'flex',
        flexDirection: 'column'
        }
    };

    Modal.setAppElement(document.getElementById('root'));

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [id, setUID] = useState(-1);
    const [modal, setModal] = useState(false);

    const handleChange = event => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        }
        else {
            setPassword(event.target.value);
        }   
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!username || !password) {
            setMessage('username/password field is empty!');
            setError(true);
            return;
        }
        axios.post('/api/login', {
            username: username,
            password: password  
        }).then((response) => {
            if (response.data.error) {
                setError(true);
            }
            else {
                openModal();
                localStorage.setItem("token", response.data.token);
            }
            setUID(response.data.userID);
            setMessage(response.data.message);
            setError(response.data.error);
        }); 
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    };

    const userAuthentication = () => {
        axios.get('/api/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.data.auth) {
                localStorage.setItem("isLogged", true);
                localStorage.setItem("user", username);
                localStorage.setItem("userID", id);
                setMessage(response.data.message);
                axios.post('/api/load', {
                    userID: id,
                }).then((response) => {
                    console.log(response.data)
                    if (response.data) {
                        localStorage.setItem("myRooms", JSON.stringify(response.data));
                    }
                    window.location.href="/";
                });
            }
        });
    }

    return (
        <div className="login-container">
            <main>
                <br/><br/>
                <form className="create-form" onSubmit={handleSubmit}>
                    <h1 style={{fontSize: '24px', marginBottom: '32px', color: 'goldenrod'}}>Login</h1>
                    <div 
                        style={{
                            color: error ? 'red' : 'goldenrod', 
                            display: message ? '' : 'none',
                            marginBottom: '20px', 
                            fontSize: '16px'
                        }}
                    >{message}</div>
                    <input 
                        name="username"
                        value={username} 
                        placeholder="Enter username"
                        onChange={handleChange}
                        style={{marginBottom: '10px'}} 
                    ></input><br/><br/>
                    <input 
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={handleChange} 
                        style={{marginBottom: '10px'}} 
                    ></input><br/><br/><br/><br/>
                    <Link to='/register' style={{fontSize: '14px', color: 'blue'}}>
                        Register
                    </Link>
                    <br/><br/>
                    <button type="submit" 
                        className="btn waves-effect green" 
                        style={{width: '100%', height: '50px', background: 'goldenrod', color: 'white'}}
                    >LOGIN</button>
                    <Modal isOpen={modal} style={modalStyles}>
                        <button onClick={closeModal} className="close-button" style={{margin: '0 0 30px 0', marginLeft: '96%'}}>
                            <FaTimes/>
                        </button>
                        <button className="authenticate-btn" onClick={userAuthentication}>
                            Click to Authenticate
                        </button> 
                    </Modal>
                </form>
            </main>
        </div>
    );
}