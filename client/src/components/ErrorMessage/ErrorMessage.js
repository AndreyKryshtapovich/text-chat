import * as React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';

class ErrorMessage extends React.Component {
    render() {
        return <DialogContentText color="error">
            {this.props.errorMessage}
        </DialogContentText>;
    }
}

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;