import * as React from 'react';
import MessageSender from './messageSender/MessageSender'
import ChatHistory from './chatHistory/ChatHistory'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Chat.css'

class Chat extends React.Component {
    render() {
        const {currentTopic, messages, currentUser} = this.props;
        return (
            <Paper className="chat-paper" zdepth={2}>
                <Typography variant="h6"
                            noWrap={true}>{currentTopic}</Typography>
                <ChatHistory
                    messages={messages}
                    userInfo={currentUser}
                />
                <MessageSender userInfo={currentUser}/>
            </Paper>);
    }
}

export default Chat;