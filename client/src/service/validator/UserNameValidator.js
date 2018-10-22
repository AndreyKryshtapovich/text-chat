import ApiService from "../ApiService";
import {ERROR_MESSAGES} from "../../common/Constants";

class UserNameValidator {
    constructor() {
        this.errors = [];
    }

    validate = (userName) => {
        this.errors = [];
        this.validateServerAvailability();
        if (this.hasErrors()) {
            return;
        }
        this.validateUserName(userName);
    };

    validateServerAvailability = () => {
        const isServerAvailable = ApiService.isConnected();
        if (!isServerAvailable) {
            this.errors.push(ERROR_MESSAGES.SERVER_UNAVAILABLE_MSG);
        }
    };

    validateUserName = (username) => {
        const isInvalid = !username;
        if (isInvalid) {
            this.errors.push(ERROR_MESSAGES.EMPTY_USERNAME_MSG);
        }
    };

    hasErrors = () => {
        return this.errors.length > 0;
    };

    getErrors = () => {
        return this.errors;
    };
}

export default new UserNameValidator();
