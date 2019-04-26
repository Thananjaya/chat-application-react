import React, { Component } from 'react';

class SendMessage extends Component {
    constructor() {
        super();
        this.state = {
            message:'',
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.sendNewMessage(this.state.message);
        this.setState({message: ''});
    }

    render() {
        return (
            <form 
                onSubmit={(event) => this.onSubmit(event)} 
                className="send-message-form"
            >
                <input
                    onChange={(event => this.setState({ message: event.target.value }))}
                    value={this.state.message}
                    placeholder="Send a message by pressing ENTER"
                    type="text"
                    disabled={this.props.disabled}
                />
            </form>
        )
    }
}

export default SendMessage;