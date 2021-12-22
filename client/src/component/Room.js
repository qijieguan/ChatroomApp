
const Room = ({ room , joinRoom }) => {
    return (
        <div className="room" id={room.id}>
            <div className="room-heading">{room.subject}</div>
            <div className="room-body">{room.description}</div>
            <div className="room-footing"> 
                <div style={flexStyle}>
                    <div>Host: {room.host}</div>
                    {room.size < 30 ?
                        <button className="join-btn" onClick={() => joinRoom(room.id)}>Join</button>
                    :
                        <div style={{color: 'red'}}>Class is full!</div>
                    }   
                </div>
                <div style={Object.assign({marginTop: '10px'}, flexStyle)}>
                    <span>privacy: {room.privacy}</span>
                    <span>size: {room.size}/30</span>
                </div> 
            </div>
        </div> 
    );
};

const flexStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    marginLeft: '5%', 
    width: '90%'
}

export default Room;