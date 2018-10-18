import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorMessage from './ErrorMessage'
import ApiService from '../../service/ApiService'
import './NamePicker.css'
import {ERROR_MESSAGES} from '../../common/Constants';

class NamePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {serverUnavailable: false};
    }

    render() {
        return (
            <Dialog open={this.props.modalOpen}>
                <DialogTitle>Who are you ?</DialogTitle>
                <DialogContent className='dialog-content'>
                    <ErrorMessage showError={this.state.serverUnavailable}
                                  errorMessage={ERROR_MESSAGES.SERVER_UNAVAILABLE_MSG}/>
                    <TextField
                        id="name"
                        autoFocus={true}
                        label="Nickname"
                        fullWidth={true}
                        required={true}
                        onChange={this.handleNameChange}
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
        const serverUnavailable = !ApiService.isConnected();
        if (serverUnavailable) {
            this.setState({serverUnavailable: true});
            return;
        }
        const userName = this.state.userName;
        if (!userName) {
            return;
        }
        ApiService.onInitialConnection(userName, this.props.onMessageReceived);
        this.props.onNamePicked();
    };

    handleNameChange = (event) => {
        this.setState({userName: event.target.value});
    };
}

NamePicker.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    onNamePicked: PropTypes.func.isRequired,
    onMessageReceived: PropTypes.func.isRequired,
};

export default NamePicker