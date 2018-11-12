import * as React from 'react';
import MessageSender from './messageSender/MessageSender'
import ChatHistory from './chatHistory/ChatHistory'
import Paper from '@material-ui/core/Paper';
import './Chat.css'

class Chat extends React.Component {
    render() {
        return (
            <Paper className="chat-paper" zdepth={2}>
                <ChatHistory messages={this.props.messages}/>
                <MessageSender userInfo={this.props.currentUser}/>
            </Paper>);
    }
}

export default Chat;