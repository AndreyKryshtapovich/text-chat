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
        return <div key={key}>{message.content}</div>
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