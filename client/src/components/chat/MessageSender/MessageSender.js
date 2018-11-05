import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
<<<<<<< HEAD
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import MessageValidator from "../../../service/validator/MessageValidator";
import ApiService from "../../../service/ApiService";
import ErrorMessages from "../../errorMessage/ErrorMessages";
import './MessageSender.css'
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MessageSender.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import MessageValidator from "../../../service/validator/MessageValidator";
import ErrorMessages from "../../ErrorMessage/ErrorMessages";
import ApiService from "../../../service/ApiService";
>>>>>>> ea932843eef014680c86c4278427b113bdf049d5

library.add(faPaperPlane);

class MessageSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: '', showErrors: false, userInfo: props.userInfo};
    }

    render() {
        const {message, showErrors, userInfo} = this.state;
        if (showErrors) {
            MessageValidator.validate(message);
        }
        return (
            <div>
<<<<<<< HEAD
                <ErrorMessages errorMessages={MessageValidator.getErrors()}/>

                <TextField id="outlined-multiline-flexible" multiline={true} rowsMax="3" margin="normal"
                           className={"message-input"}
                           variant="outlined" value={message} onChange={this.handleMessageChange}
                           error={MessageValidator.hasErrors()}/>
                <Button className={"button-send"} variant="outlined" color="primary" onClick={this.send}>
                    <FontAwesomeIcon icon="paper-plane"/>
                </Button>
            </div>
=======
            <ErrorMessages errorMessages={MessageValidator.getErrors()}/>

            < TextField id = "outlined-multiline-flexible" multiline = {true} rowsMax = "3" margin = "normal" className={"message-input"}
                  variant = "outlined" value={message} onChange={this.handleMessageChange} error={MessageValidator.hasErrors()}/>
            <Button className={"button-send"} variant="outlined" color="primary" onClick={this.send}>
                <FontAwesomeIcon icon="paper-plane"/>
            </Button>
        </div>
>>>>>>> ea932843eef014680c86c4278427b113bdf049d5
        );
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value});
    };

    send = () => {
        const {message, userInfo} = this.state;
        this.setState({showErrors: true});
        MessageValidator.validate(message);
<<<<<<< HEAD
        if (!MessageValidator.hasErrors()) {
=======
        if(!MessageValidator.hasErrors()) {
>>>>>>> ea932843eef014680c86c4278427b113bdf049d5
            ApiService.send(userInfo, message);
            this.setState({message: '', showErrors: false});
        }
    };
}

export default MessageSender;