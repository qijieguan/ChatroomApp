import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMenuFold } from 'react-icons/ai';


const Menu = () => {
    
    const url = localStorage.getItem("url");
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
    }, []);

    return (
        <div style={{width: '20%'}}>
            {localStorage.getItem("isLogged")
                ?
                <div className="menu-icon" style={{float: 'center'}}>
                    <AiOutlineMenuFold
                        size={25}
                        color='white'
                        style={{float: 'left', marginLeft: '40px'}}
                    />
                    <nav className="nav-panel">
                        <div className='profile'>
                            <img src={url} className='profile-img' alt=""/>
                            <div className='profile-name'>{localStorage.getItem("user")}</div>
                        </div>
                        <Link to="/create" className='nav-li'>Create Classroom</Link>
                        <Link to="/join" className='nav-li'>Join Classroom</Link>
                        <label className="room-label">- - - - - - - Own - - - - - - -</label>
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
                        <label className="room-label"> - - - - - - - Joined - - - - - - -</label>
                        {Rooms ? 
                            Rooms.map(room => 
                                room.host !== localStorage.getItem("user") ?
                                    <Link to={`/room/${room.id}`} key={room.id} className="my-room nav-li" onClick={() => {localStorage.setItem('currRoom', room.subject)}}>
                                        {room.subject}
                                    </Link>
                                    :
                                    ""
                            )
                        :
                            ''}
                    </nav>
                </div>
                :
                <div/>
            }
        </div>
    );
}

export default Menu;