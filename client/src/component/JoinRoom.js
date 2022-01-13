import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Room.js';

export default function Join() {
    const [RoomList, setRoomList] = useState([]); 
    
    let filterMyRooms = (joinedRooms, publicRooms) => {
        for (let i = 0; i < joinedRooms.length; ++i) {
            for (let j = 0; j < publicRooms.length; ++j) {
                if (joinedRooms[i].id === publicRooms[j].id) {
                    publicRooms.splice(j, 1);
                    console.log(publicRooms[j]);
                }
            }
        } 
        return publicRooms; 
    }
    
    
    useEffect(() => { 
        axios.get('http://localhost:3001/api/join').then((response) => {
            let publicRooms = (response.data).filter(data => data.host_id !== localStorage.getItem("userID"));
            if (localStorage.getItem("myRooms")) {  
                let joinedRooms = JSON.parse(localStorage.getItem("myRooms"));
                publicRooms = filterMyRooms(joinedRooms, publicRooms);
                setRoomList(publicRooms);
            }
        });         
    }, [RoomList]);

    const joinRoom = (room_id) => {
        axios.post('http://localhost:3001/api/join', {
            userID: localStorage.getItem("userID"),
            roomID: room_id
        }).then((response) => {
            setRoomList((RoomList.filter(data => data.id !== room_id)));
        });
    };

    return(
        <div className="room-container">
            {RoomList.length > 0 ? RoomList.map(room => 
                <Room room={room} key={room.id} joinRoom={joinRoom} />)
            :
                <div style={{marginTop: '10%', fontSize: '30px', textAlign: 'center'}}>No classrooms open currently</div>    
            }
        </div>
    );
};