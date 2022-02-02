import React, { useState } from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiFillCloseSquare } from 'react-icons/ai';

export default function Login() {

    const modalStyles = {
        content : {
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'space-around',
        top : '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35%',
        height: '35%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)', 
        zIndex: '4'
        }
    };

    Modal.setAppElement(document.getElementById('root'));

    const [username, setUsername] = useState("Guest");
    const [password, setPassword] = useState("password");
    const [url, setURL] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [id, setUID] = useState(-1);
    const [modal, setModal] = useState(false);
    const [token, setToken] = useState("");

    const handleChange = event => {
        if (event.target.name === "username") {setUsername(event.target.value);}
        else {setPassword(event.target.value);}   
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
            if (response.data.error) {setError(true);}
            else {
                openModal();
                setToken(response.data.token);
            }
            setUID(response.data.userID);
            setURL(response.data.url);
            setMessage(response.data.message);
            setError(response.data.error);
        }); 
    }

    const openModal = () => {
        setModal(true);
        document.getElementsByClassName('login-form')[0].style.zIndex = 0;
    }

    const closeModal = () => {
        setMessage("");
        setModal(false);
        setToken("");
    };

    const userAuthentication = () => {
        axios.get('/api/auth', {
            headers: { "x-access-token": token }
        }).then((response) => {
            if (response.data.auth) {
                sessionStorage.setItem("isLogged", true);
                sessionStorage.setItem("user", username);
                sessionStorage.setItem("userID", id);
                sessionStorage.setItem("url", url);
                setMessage(response.data.message);
                axios.post('/api/load', {
                    userID: id,
                }).then((response) => {
                    if (response.data) { sessionStorage.setItem("myRooms", JSON.stringify(response.data)); }
                    window.location.href="/dashboard";
                });
                setToken("");
            }
        });
    }

    return (
        <div className="home login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label className='login-label'>Login</label>
                <div className='error-msg'
                    style={{
                        color: error ? 'red' : 'goldenrod', 
                        display: message ? '' : 'none',
                        marginBottom: '20px', 
                        fontSize: '16px',
                    }}
                >{message}</div>
                <input name="username" style={{marginBottom: '10px', height: '40px'}} 
                    value={username} 
                    placeholder="Enter username"
                    onChange={handleChange}
                ></input>
                <input name="password" type="password" style={{marginBottom: '10px', height: '40px'}} 
                    value={password}
                    placeholder="Enter password"
                    onChange={handleChange} 
                ></input>
                
                <Link to='/register' style={{color: 'blue', fontSize: '16px'}}>Register</Link>
                <button type="submit" className="submit-btn" style={{background: 'yellowgreen'}}>LOGIN</button>
            </form>      
            <Modal isOpen={modal} style={modalStyles}>
                <AiFillCloseSquare className="close-button" style={{alignSelf: 'flex-end', color: 'red'}}
                    onClick={closeModal}
                    size={24}
                />
                <button className="authenticate-btn" onClick={userAuthentication}>Click to Authenticate</button> 
            </Modal>
        </div>
    );
}