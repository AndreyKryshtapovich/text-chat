import * as React from 'react';
import PropTypes from 'prop-types';
import {MESSAGE_TYPES} from "../../../common/Constants";
import './ChatHistory.css'

class ChatHistory extends React.Component {
    render() {
        const messages = this.props.messages.map((message, key) => {
            return this.renderInfoMessage(message, key)
        });
        return <div className="history-page">{messages}</div>;
    };

    renderInfoMessage = (message, key) => {
        return <div key={key}>{this.getMessageText(message)}</div>
    };

    getMessageText = (message) => {
        if (MESSAGE_TYPES.JOIN === message.type) {
            return `${message.sender} joined.`;
        } else if (MESSAGE_TYPES.LEAVE === message.type) {
            return `${message.sender} left.`;
        } else {
            return message.content;
        }
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