import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import MessageValidator from "../../../service/validator/MessageValidator";
import ApiService from "../../../service/ApiService";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ErrorMessages from "../../errorMessage/ErrorMessages";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

library.add(faPaperPlane);

class MessageSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            showErrors: false,
        };
    }

    render() {
        const {message, showErrors} = this.state;
        const styles = {
            messageInput: {
                width: '97%',
                marginLeft: '5px',
            },
            buttonSend: {
                marginRight: '20px',
            }
        };
        if (showErrors) {
            MessageValidator.validate(message);
        }
        return (
            <Grid container={true} direction="row" spacing={8} alignItems="center">
                <Grid item={true} xs={10}>
                    <ErrorMessages errorMessages={MessageValidator.getErrors()}/>
                    <TextField
                        style={styles.messageInput}
                        multiline={true}
                        fullWidth={true}
                        rowsMax="3"
                        variant="outlined"
                        margin="dense"
                        value={message}
                        onChange={this.handleMessageChange}
                        error={MessageValidator.hasErrors()}
                    />
                </Grid>
                <Grid item={true} xs={2}>
                    <IconButton color="primary" onClick={this.send} style={styles.buttonSend}>
                        <FontAwesomeIcon icon="paper-plane"/>
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value});
    };

    send = () => {
        const {message} = this.state;
        const {userInfo} = this.props;
        this.setState({showErrors: true});
        MessageValidator.validate(message);
        if (!MessageValidator.hasErrors()) {
            ApiService.send(userInfo, message);
            this.setState({message: '', showErrors: false});
        }
    };
}

MessageSender.propTypes = {
    userInfo: PropTypes.string.isRequired,
};

export default MessageSender;