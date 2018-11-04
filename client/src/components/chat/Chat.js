import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import MessageSender from './MessageSender/MessageSender'
import ChatHistory from './ChatHistory/ChatHistory'
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