import ApiConnector from '../service/ApiConnector';
import {MESSAGE_TYPES} from '../common/Constants';

const PUBLIC_TOPIC = '/topic/public';
const ADD_USER_URL = '/app/chat.addUser';

class ApiService {

    onInitialConnection = (username, onMessageReceived) => {
        if (!ApiConnector.isConnected()) {
            return;
        }
        const connector = ApiConnector.getConnector();
        this.subscribe(PUBLIC_TOPIC, connector, onMessageReceived);
        connector.send(ADD_USER_URL,
            {},
            JSON.stringify({sender: username, type: MESSAGE_TYPES.JOIN})
        )
    };

    subscribe = (channel, connector, onMessageReceived) => {
        connector.subscribe(channel, onMessageReceived);
    };

    isConnected = () => {
        return ApiConnector.isConnected();
    };
}

export default new ApiService();