import React, { useState } from 'react';
import MyDropzone from './Dropzone.js';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

    const defaultURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    const [url, setURL] = useState("");
    const [files, setFiles] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = event => {
        if (event.target.name === "username") {setUsername(event.target.value);}
        else {setPassword(event.target.value);}   
    }

    const readFiles = (files) => {
        if (!files) {return}
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files) }, false);
        reader.readAsDataURL(files[0]); 
    }

    const getFiles = (files) => {readFiles(files);}
    const previewFile = (event) => {readFiles(event.target.files)}

    const uploadImage = () => {
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload',
        {
            method: 'POST',
            body: data
        }).then(res => res.json()).then(json => {
            axios.post('/api/register', {
            username: username,
            password: password,
            image_url: json.secure_url
            }).then((response) => {
                setMessage(response.data.message);
                setError(response.data.error);
            });
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!username || !password || !files) {
            setMessage('One or more fields are empty!');
            setError(true);
            return;
        }
        uploadImage();
        setUsername("");
        setPassword("");
        setURL(defaultURL);
    }

    return (
        <div id="register-container">
        <form id="register-form" onSubmit={handleSubmit}>
            <div id='register-label'>Registeration</div>
            <div id='error-msg'
                style={{
                    color: error ? 'red' : 'goldenrod', 
                    display: message ? '' : 'none',
                    marginBottom: '20px', 
                    fontSize: '16px'
                }}>{message}</div>
                <div id='image-section'>
                    <img src={url ? url : defaultURL} id='preview' alt=""/>
                    <div id='image-select'>    
                        <MyDropzone getFiles={getFiles}/>
                        <input type="file" id="file" accept='image/*' onChange={previewFile}/>
                    </div>
                </div>
                <div id='input-section'>
                    <input style={{marginBottom: '20px', height: '50px'}} 
                        name="username"
                        value={username} 
                        placeholder="Enter username"
                        onChange={handleChange}
                    ></input>
                    <input style={{marginBottom: '20px', height: '50px'}} 
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={handleChange} 
                    ></input>
                    <Link to='/login' id="login-link">Sign In</Link>
                    <button type="submit" id="submit-btn">REGISTER</button>
                </div>
            </form>
        </div>
    );
}