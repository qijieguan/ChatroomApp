import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Nav () {
    
    const [Rooms, setRooms] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("myRooms")) {
            axios.post('/api/load', {
                userID: localStorage.getItem("userID")
            }).then((response) => {
                if (response.data) {
                    localStorage.setItem("myRooms", JSON.stringify(response.data));
                    setRooms(response.data);
                }
            });
        };
    }, [])

    const navToggle = () => {
        const nav = document.querySelector(".nav-panel");
        nav.classList.toggle("nav-active");
    }

    const logout = () => {
      localStorage.clear();
      window.location.href='/login';
    };
  
    return (
        <div>
            <div className = "nav-bar">
                <div className="hamburger" style={{display: localStorage.getItem("isLogged") ? '' : 'none'}} onClick={navToggle}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="logo">CLASS BOARD</div>
                <ul className="nav-links">     
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    {localStorage.getItem("isLogged") ?
                    <div className="logout" onClick={logout} >
                        <Link to="/" style={{color: 'white'}}>
                            <li>Logout</li>
                        </Link>
                    </div>
                    :
                    <div className="login">
                        <Link to="/login" style={{color: 'white'}}>
                            <li>Login</li>
                        </Link>
                    </div>
                    }
                </ul>
            </div>
            <div className="nav-panel" style={{display: localStorage.getItem("isLogged") ? '' : 'none'}}>
                <ul>
                    <Link to="/create" style={{color: 'white'}}>
                        <li>Create Classroom</li>
                    </Link>
                    <Link to="/join" style={{color: 'white'}}>
                        <li>Join Classroom</li>
                    </Link>
                    <div className="room-label">- - - - - - - Own - - - - - - -</div>
                    {Rooms ? 
                        Rooms.map(room => 
                            room.host === localStorage.getItem("user") ?
                                <Link to={`/room/${room.id}`} key={room.id} className="myRoom" onClick={() => {localStorage.setItem('currRoom', room.subject)}}>
                                    {room.subject}
                                </Link>
                                :
                                ""
                        )
                    :
                     ''}
                    <div className="room-label"> - - - - - - - Joined - - - - - - -</div>
                    {Rooms ? 
                        Rooms.map(room => 
                            room.host !== localStorage.getItem("user") ?
                                <Link to={`/room/${room.id}`} key={room.id} className="myRoom" onClick={() => {localStorage.setItem('currRoom', room.subject)}}>
                                    {room.subject}
                                </Link>
                                :
                                ""
                        )
                    :
                     ''}
                </ul>
            </div>
        </div>
    );
};