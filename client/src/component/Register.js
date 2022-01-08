import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
        axios.post('/api/register', {
            username: username,
            password: password  
        }).then((response) => {
            setMessage(response.data.message);
            setError(response.data.error);
        });
        setUsername("");
        setPassword("");
    }

    return (
        <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <label className='register-label'>Register</label>
            <div className='error-msg'
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
                    style={{marginBottom: '10px', height: '40px'}} 
                ></input>
                <input 
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={handleChange} 
                    style={{marginBottom: '10px', height: '40px'}} 
                ></input>
                <Link to='/login' style={{color: 'blue'}}>Login</Link>
                <button type="submit" 
                    className="btn waves-effect green" 
                    style={{width: '90%', height: '50px', color: 'white', backgroundColor: 'green'}}
                >REGISTER</button>
            </form>
        </div>
    );
}