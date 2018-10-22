import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import MessageInput from './MessageSender/MessageSender'
import ChatHistory from './ChatHistory/ChatHistory'
import './Chat.css'

class Chat extends React.Component {
    render() {
        return (
            <Paper className="chat-paper" zdepth={2}>
                <ChatHistory messages={this.props.messages}/>
                <MessageInput/>
            </Paper>);
    }
}

export default Chat;