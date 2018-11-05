import * as React from 'react';
import PropTypes from 'prop-types';
import './ChatHistory.css'

class ChatHistory extends React.Component {
    render() {
        const messages = this.props.messages.map((message, key) => {
            return this.renderInfoMessage(message, key)
        });
        return <div className="history-page">{messages}</div>;
    };

    renderInfoMessage = (message, key) => {
<<<<<<< HEAD:client/src/components/chat/chatHistory/ChatHistory.js
        return <div key={key}>{message.content}</div>
=======
        return <div key={key}>{this.getMessageText(message)}</div>
    };

    getMessageText = (message) => {
        if (MESSAGE_TYPES.JOIN === message.type) {
            return `${message.sender} joined.`;
        } else if (MESSAGE_TYPES.LEAVE === message.type) {
            return `${message.sender} left.`;
        } else {
            return `${message.sender}: ${message.content}`;
        }
>>>>>>> ea932843eef014680c86c4278427b113bdf049d5:client/src/components/chat/ChatHistory/ChatHistory.js
    };
}

ChatHistory.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        sender: PropTypes.string,
        type: PropTypes.string,
    })).isRequired
};

export default ChatHistory