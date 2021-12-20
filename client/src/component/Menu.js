import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMenuFold } from 'react-icons/ai';


const Menu = () => {

    const [Rooms, setRooms] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("myRooms")) {
            axios.post('http://localhost:3001/api/load', {
                userID: localStorage.getItem("userID")
            }).then((response) => {
                if (response.data) {
                    localStorage.setItem("myRooms", JSON.stringify(response.data));
                    setRooms(response.data);
                }
            });
        };
    }, [])

    return (
        <div className="menu-icon" style={{display: localStorage.getItem("isLogged") ? '' : 'none'}}>
            <AiOutlineMenuFold
                size={25}
                color='white'
                style={{marginLeft: '20px'}}
            />
            <div className="nav-panel" style={{display: localStorage.getItem("isLogged") ? '' : 'none'}}>
                <Link to="/create" className='nav-li'>Create Classroom</Link>
                <Link to="/join" className='nav-li'>Join Classroom</Link>
                <div className="room-label">- - - - - - - Own - - - - - - -</div>
                {Rooms ? 
                    Rooms.map(room => 
                        room.host === localStorage.getItem("user") ?
                            <Link to={`/room/${room.id}`} key={room.id} className="myRoom nav-li"
                                onClick={() => {localStorage.setItem('currRoom', room.subject)}}>
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
            </div>
        </div>
    );
}

export default Menu;