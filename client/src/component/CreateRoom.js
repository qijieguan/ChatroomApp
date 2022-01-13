import React, { useState} from 'react';
import axios from 'axios';

export default function Create () {
    const [subject, setSubject] = useState("");
    const [desc, setDesc] = useState("");

    const handleChange = event => {
        if (event.target.name === "subject") {
            setSubject(event.target.value);
        }
        if (event.target.name === "description") {
            setDesc(event.target.value); 
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!subject) {
            console.log("Missing input!")
            return;
        }
        axios.post('http://localhost:3001/api/create', {
            host: localStorage.getItem('user'),
            subject: subject,
            desc: desc,
            privacy: document.getElementById('privacy').value,
            users_by_id: localStorage.getItem('userID')
        });
        setSubject("");
        setDesc("");
        window.location.reload();
    }
    return ( 
        <form className="room-form">
            <h1 style={styleH1}>Create Room</h1>

            <label>Host</label>
            <input 
                name="host"
                defaultValue={localStorage.getItem("user")}
                style = {{pointerEvents: 'none', background: 'rgb(230, 230, 230)'}}
            />

            <label>Subject<span style={{color: 'red'}}>*</span></label>
            <input
                name="subject"
                value={subject}
                placeholder='Enter subject here... '
                onChange={handleChange}
            />

            <label>Description </label>
            <textarea
                name="description"
                placeholder='Enter description here... <optional>'
                value={desc}
                onChange={handleChange}
                style={{height: '150px'}}
            />

            <label style={{margin: '5px'}}>Privacy<span style={{color: 'red'}}>*</span></label>
            <select id="privacy" name="privacy" style={{width: '50%'}}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>

            <button type="submit" 
                style={submitStyle}
                onClick={handleSubmit}
            >CREATE</button>
        </form>
    );
};

const styleH1 = {
    gridColumn: '1 / 3',
    fontSize: '40px', 
    color: 'navy', 
    textShadow: '1px 1px blue'
}

const submitStyle = {
    gridColumn: '1 / 3',
    marginLeft: '15%',
    fontSize: '22px',
    height: '80px', 
    width: '70%', 
    color: 'white',
    background: 'navy', 
}