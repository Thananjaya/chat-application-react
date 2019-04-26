import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import { instance, tokenUrl } from '../config/chatKitConfig';
import RoomList from './roomList';
import NewRoom from './newRoom';
import SendMessage from './sendMessage';
import Messages from './messages';


class ChatApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            roomId: null,
            notJoinedRooms: [],
            joinedRooms: []
        }
        this.sendNewMessage = this.sendNewMessage.bind(this);
    }

    componentDidMount() {
        const token = new Chatkit.TokenProvider({
            url: tokenUrl
        })
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instance,
            userId: 'thananjaya',
            tokenProvider: token
        });
        
        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.getRooms();
            })
            .catch(err => console.log('error on ummala: ', err));

    }
    
    getRooms() {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    notJoinedRooms: joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log('error on geting list of rooms: ', err));
    }
    
    subscribeToRoom(id) {
        this.setState({ messages: [] });
        this.currentUser.subscribeToRoom({
            roomId: id,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        }).then((room) => {
            this.setState({ roomId: room.id });
            this.getRooms();
        });
    }
    
    sendNewMessage(text){
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        });
    }

    createRoom(name) {
        this.currentUser.createRoom({ 
            name 
        }).then((room) => {
            this.subscribeToRoom(room.id)
        });
    }

    render(){
        return(
            <div className="app">
                <RoomList
                    roomId = {this.state.roomId}
                    subscribeRoom={(id) => this.subscribeToRoom(id)} 
                    rooms={[...this.state.notJoinedRooms, ...this.state.joinedRooms]}
                />
                <Messages
                    roomId={this.state.roomId} 
                    messages={this.state.messages} 
                />
                <NewRoom createRoom={(name) => this.createRoom(name)} />
                <SendMessage 
                    disabled={!this.state.roomId} 
                    sendNewMessage={this.sendNewMessage} 
                />
            </div>            
        )
    }

}

export default ChatApp;