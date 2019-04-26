import React, { Component } from 'react';

class RoomList extends Component {

    render(){
        return(
            <div className="rooms-list">
                <ul>
                <h3>Public rooms:</h3>
                    {this.props.rooms.map(room => {
                        const active = this.props.roomId === room.id ? " active" : "";
                        return (
                            <li key={room.id} className={"room" + active}>
                                <button onClick={() => this.props.subscribeRoom(room.id)}># {room.name}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList;