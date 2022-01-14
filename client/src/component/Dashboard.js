import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {

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
    }, []);

    return (
        <div className="dashboard-container">
            <Link to="/create"><h1 className='create-room'>Create Room</h1></Link>
            <Link to="/join">
                <h1 className='join-room' style={{marginLeft: '50px', background: 'orange'}}>Join Room</h1>
            </Link>
            {Rooms ? 
                <nav className='room-nav'>
                    {Rooms.map(room =>  
                        <Link to={`/room/${room.id}`} key={room.id} className="room-link"
                            onClick={() => {localStorage.setItem('currRoom', room.subject)}}>
                            {room.subject}
                        </Link>
                    )}
                </nav>
            :''}
        </div>
    );
}