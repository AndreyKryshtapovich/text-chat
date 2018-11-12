import ApiConnector from '../service/ApiConnector';
import {MESSAGE_TYPES} from '../common/Constants';

const PUBLIC_TOPIC = '/topic/public';
const ADD_USER_URL = '/app/chat.addUser';
const SEND_MSG_URL = '/app/chat.sendMessage';

class ApiService {

    onInitialConnection = (username, onMessageReceived) => {
        const connector = ApiConnector.getConnector();
        if(!connector) {
            return;
        }
        this.subscribe(PUBLIC_TOPIC, connector, onMessageReceived);
        connector.send(ADD_USER_URL,
            {},
            JSON.stringify({sender: username, type: MESSAGE_TYPES.JOIN})
        );
    };

    send = (username, text) => {
        const connector = ApiConnector.getConnector();
        if(!connector) {
            return;
        }
        connector.send(SEND_MSG_URL,
            {},
            JSON.stringify({sender: username, type: MESSAGE_TYPES.CHAT, content: text})
        );
    };

    subscribe = (channel, connector, onMessageReceived) => {
        connector.subscribe(channel, onMessageReceived);
    };

    isConnected = () => {
        return ApiConnector.isConnected();
    };
}

export default new ApiService();