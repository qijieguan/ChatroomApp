import React, { useState} from 'react';
import axios from 'axios';

export default function Create () {
    const [subject, setSubject] = useState("");
    const [desc, setDesc] = useState("");

    const handleChange = event => {
        event.preventDefault();
        if (event.target.name === "subject") {
            setSubject(event.target.value);
        }
        if (event.target.name === "description") {
            setDesc(event.target.value); 
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!subject || !desc) {
            console.log("Missing input!")
            return;
        }
        axios.post('/api/create', {
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
        <div>
            <main>
                <form className="create-room" onSubmit={handleSubmit}>
                    <br/>
                    <h1 style={{fontSize: '24px', marginBottom: '32px', color: 'green'}}>Create Room</h1>
                    <input 
                        name="host"
                        defaultValue={localStorage.getItem("user")}
                        style = {{pointerEvents: 'none', backgroundColor: 'rgb(230, 230, 230)'}}
                    >
                    </input><br/>
                    <input
                        name="subject"
                        value={subject}
                        placeholder="Enter course subject"
                        onChange={handleChange}
                    >
                    </input><br/>
                    <textarea
                        name="description"
                        value={desc}
                        placeholder="Enter course description (optional)"
                        onChange={handleChange}
                    >
                    </textarea><br/>
                    <div>
                        <label style={{margin: '5px'}}>Privacy</label>
                        <select id="privacy" name="privacy">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select><br/><br/>
                    </div>
                    <button type="submit" 
                        style={{width: '40%', height: '40px', background: 'green', color: 'white'}}
                    >
                    CREATE</button>
                    <br/>
                </form>
            </main>
        </div>
    );
};