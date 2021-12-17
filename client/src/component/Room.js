
const Room = ({ room , joinRoom }) => {
    return (
        <div className="room" id={room.id}>
            <div className="room-heading">{room.subject}</div>
            <div className="room-body">
                <p>{room.description}</p>
            </div>
            <div className="room-footing"> 
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{padding: '10px 45% 0 0', marginLeft: '4%'}}>Host: {room.host}</div>
                    {room.size < 30 ?
                        <button className="join-btn" onClick={() => joinRoom(room.id)}>Join</button>
                    :
                        <div style={{color: 'red'}}>Class is full!</div>
                    }   
                </div>
                <div style={{paddingTop: '8px'}}>
                    <span style={{marginLeft: '4%'}}>privacy: {room.privacy}</span>
                    <span style={{marginLeft: '35%'}}>size: {room.size}/30</span>
                </div> 
            </div>
        </div> 
    );
};

export default Room;