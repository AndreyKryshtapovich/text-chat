import * as React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from "./ErrorMessage";

class ErrorMessages extends React.Component {
    render() {
        return this.props.errorMessages.map((errorMsg, key) => {
            return <ErrorMessage key={key} errorMessage={errorMsg}/>
        })
    }
}

ErrorMessages.propTypes = {
    errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ErrorMessages;