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
            <main>
                <br/><br/>
                <form className="create-form" onSubmit={handleSubmit}>
                    <h1 style={{fontSize: '24px', marginBottom: '32px', color: 'goldenrod'}}>Registration</h1>
                    <div style={{color: (error ? 'red' : 'goldenrod'), marginBottom: '20px', fontSize: '16px'}}>{message}</div>
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
                    <Link to='/login' style={{fontSize: '14px', color: 'blue'}}>
                        Login
                    </Link>
                    <br/><br/>
                    <button type="submit" 
                        className="btn waves-effect green" 
                        style={{width: '100%', height: '50px', background: 'goldenrod', color: 'white'}}
                    >REGISTER</button>
                </form>
            </main>
        </div>
    );
}