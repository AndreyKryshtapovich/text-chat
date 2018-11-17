import * as React from 'react';
import PropTypes from 'prop-types';
import {MESSAGE_TYPES} from "../../../common/Constants";
import './ChatHistory.css'

class ChatHistory extends React.Component {
    render() {
        const messages = this.props.messages.map((message, key) => {
            return MESSAGE_TYPES.CHAT === message.type
                ? this.renderChatMessage(message, key)
                : this.renderInfoMessage(message, key);
        });

        return <div className="history-page">{messages}</div>;
    };

    renderInfoMessage = (message, key) => {
        return <div key={key}>{message.content}</div>
    };

    renderChatMessage = (message, key) => {
        const style = {
            display: 'block',
            margin: '5px 0'
        };

        const isMyMessage = message.sender === this.props.userInfo;
        const floatDirection = isMyMessage ? 'right' : 'left';
        const nameColor = isMyMessage ? 'green' : 'red';
        const margin = isMyMessage ? ' 0 0 0 40px' : '0 40px 0 0 ';

        const textStyle = {
            float: floatDirection,
            backgroundColor: '#fff',
            padding: '6px 10px',
            borderRadius: '15px',
            margin: margin,
            textAlign: 'left'
        };

        const nameStyle = {
            color: nameColor,
            float: floatDirection
        };

        return (
            <div key={key} style={style}>
                <span style={textStyle}>
                    <span style={nameStyle}>{message.sender}:</span>
                    <br/>
                    {message.content}
                </span>
            </div>
        );
    }
}

ChatHistory.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        sender: PropTypes.string,
        type: PropTypes.string,
    })).isRequired,
    userInfo: PropTypes.string.isRequired
};

export default ChatHistory