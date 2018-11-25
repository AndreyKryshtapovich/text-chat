import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ApiService from '../../service/ApiService'
import './NamePicker.css'
import UserNameValidator from "../../service/validator/UserNameValidator";
import ErrorMessages from "../errorMessage/ErrorMessages";

class NamePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', showErrors: false};
    }

    render() {
        const {showErrors, username} = this.state;

        if (showErrors) {
            UserNameValidator.validate(username);
        }
        return (
            <Dialog open={this.props.modalOpen}>
                <DialogTitle>Who are you ?</DialogTitle>
                <DialogContent className="dialog-content">
                    <ErrorMessages errorMessages={UserNameValidator.getErrors()}/>
                    <div>{this.errorMessage}</div>
                    <TextField
                        id="name"
                        autoFocus={true}
                        value={username}
                        label="Nickname"
                        fullWidth={true}
                        required={true}
                        onChange={this.handleNameChange}
                        error={UserNameValidator.hasErrors()}
                    />
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.onInitialConnection}>
                            Start Chatting
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>);
    }

    onInitialConnection = () => {
        this.setState({showErrors: true});
        const {username} = this.state;
        UserNameValidator.validate(username);
        if (!UserNameValidator.hasErrors()) {
            ApiService.onInitialConnection(username, this.props.onMessageReceived);
            this.props.onNamePicked(username);
        }
    };

    handleNameChange = (event) => {
        this.setState({username: event.target.value});
    };
}

NamePicker.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    onNamePicked: PropTypes.func.isRequired,
    onMessageReceived: PropTypes.func.isRequired,
};

export default NamePicker