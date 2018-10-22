import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MessageSender.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import MessageValidator from "../../../service/validator/MessageValidator";
import ErrorMessages from "../../ErrorMessage/ErrorMessages";

library.add(faPaperPlane);

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: '', showErrors: false};
    }

    render() {
        const {message, showErrors} = this.state;
        if (showErrors) {
            MessageValidator.validate(message);
        }
        return (
            <div>
            <ErrorMessages errorMessages={MessageValidator.getErrors()}/>

            < TextField id = "outlined-multiline-flexible" multiline = {true} rowsMax = "3" margin = "normal" className={"message-input"}
                  variant = "outlined" value={message} onChange={this.handleMessageChange} error={MessageValidator.hasErrors()}/>
            <Button className={"button-send"} variant="outlined" color="primary" onClick={this.send}>
                <FontAwesomeIcon icon="paper-plane"/>
            </Button>
        </div>
        );
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value});
    };

    send = () => {
        const {message} = this.state;
        this.setState({showErrors: true});
        MessageValidator.validate(message);
        if(!MessageValidator.hasErrors()) {
            console.log('Send');
        }
    };
}

export default MessageInput;