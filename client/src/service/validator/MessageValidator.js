import {ERROR_MESSAGES} from "../../common/Constants";

class MessageValidator {
    constructor() {
        this.errors = [];
    }

    validate = (message) => {
        this.errors = [];
        this.validateMessage(message);
    };

    validateMessage = (message) => {
        const isInvalid = !message;
        if (isInvalid) {
            this.errors.push(ERROR_MESSAGES.EMPTY_MESSAGE_MSG);
        }
    };

    hasErrors = () => {
        return this.errors.length > 0;
    };

    getErrors = () => {
        return this.errors;
    };
}

export default new MessageValidator();
