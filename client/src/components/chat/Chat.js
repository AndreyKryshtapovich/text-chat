import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import MessageSender from './messageSender/MessageSender'
import ChatHistory from './chatHistory/ChatHistory'
import './Chat.css'

class Chat extends React.Component {
    render() {
        return (
            <div className="chat-paper">
                <ChatHistory messages={this.props.messages}/>
                <MessageSender userInfo={this.props.currentUser}/>
            </div>);
    }
}

export default Chat;