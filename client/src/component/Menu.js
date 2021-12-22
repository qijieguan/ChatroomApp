import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMenuFold } from 'react-icons/ai';


const Menu = () => {

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

    return (
        <div style={{width: '20%'}}>
            {localStorage.getItem("isLogged")
                ?
                <div className="menu-icon" style={{float: 'center'}}>
                    <AiOutlineMenuFold
                        size={25}
                        style={{float: 'left', marginLeft: '40px'}}
                    />
                    <div className="nav-panel">
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
                                    <Link to={`/room/${room.id}`} key={room.id} className="my-room nav-li" onClick={() => {localStorage.setItem('currRoom', room.subject)}}>
                                        {room.subject}
                                    </Link>
                                    :
                                    ""
                            )
                        :
                            ''}
                    </div>
                </div>
                :
                <div/>
            }
        </div>
    );
}

export default Menu;