import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import ChatHistory from './chatHistory/ChatHistory'
import './Chat.css'

class Chat extends React.Component {
    render() {
        return (
            <Paper className="chat-paper" zdepth={2}>
                <ChatHistory messages={this.props.messages}/>
            </Paper>);
    }
}

export default Chat;