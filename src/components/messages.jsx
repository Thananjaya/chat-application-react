import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './message';

class Messages extends Component {

    componentWillUpdate() {
        const messageContainer = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = messageContainer.scrollTop + messageContainer.clientHeight >= messageContainer.scrollHeight;
    }

    componentDidUpdate() {
        if( this.shouldScrollToBottom ) {
            const messageContainer = ReactDOM.findDOMNode(this);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }

    render(){
        if(this.props.roomId === null) {
            return(
                <div className="message-list">
                    <div className="join-room">
                        Join a room!
                    </div>
                </div>
            )
        } else {
            return(
                <div className="message-list">
                    {this.props.messages.map((message, index) => {
                        return(
                            <div key={index}>
                                <Message username={message.senderId} messageContent={message.text} />
                            </div>    
                        )
                    })}
                </div>
            )
        }
    }
}

export default Messages;