import React, { useState } from 'react';

const NewRoom = (props) => {
    const [roomName, setRoomName]  = useState('');

    const createRoom = () => {
        props.createRoom(roomName);
        setRoomName('');
    }

    return (
        <div className="new-room-form">
            <form>
                <input
                    onChange={(event) => setRoomName(event.target.value) }
                    value={roomName}
                    type="text" 
                    placeholder="Add a new room" 
                    required />
                <button id="create-room-btn" type="submit" onClick={() => createRoom()}>Add</button>
        </form>
    </div>
    )
}

export default NewRoom;