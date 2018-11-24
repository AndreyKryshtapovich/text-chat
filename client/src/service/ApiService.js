import ApiConnector from '../service/ApiConnector';
import {MESSAGE_TYPES} from '../common/Constants';

const PUBLIC_TOPIC = '/topic/public';
const ADD_USER_URL = '/app/chat.addUser';
const SEND_MSG_URL = '/app/chat.sendMessage';

class ApiService {
    constructor() {
        this.subscription = null;
        this.topic = '';
    }

    onInitialConnection = (username, onMessageReceived) => {
        this.subscribeToTopic(username, PUBLIC_TOPIC, onMessageReceived);
    };

    subscribeToTopic = (username, topic, onMessageReceived) => {
        const connector = ApiConnector.getConnector();
        if (!connector) {
            return;
        }
        this.subscribe(topic, connector, onMessageReceived);
        this.sendUserJoinedMessage(connector, username);
    };

    send = (username, text) => {
        const connector = ApiConnector.getConnector();
        if (!connector) {
            return;
        }
        connector.send(SEND_MSG_URL,
            {},
            JSON.stringify({sender: username, type: MESSAGE_TYPES.CHAT, content: text, topic: this.topic})
        );
    };

    subscribe = (topic, connector, onMessageReceived) => {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.topic = topic;
        this.subscription = connector.subscribe(topic, onMessageReceived);
    };

    sendUserJoinedMessage = (connector, username) => {
        connector.send(ADD_USER_URL,
            {},
            JSON.stringify({sender: username, type: MESSAGE_TYPES.JOIN, topic: this.topic})
        );
    };

    sendUserLeaveTopicMessage = (username) => {
        const connector = ApiConnector.getConnector();
        if (!connector) {
            return;
        }
        connector.send(SEND_MSG_URL,
            {},
            JSON.stringify({sender: username, type: MESSAGE_TYPES.LEAVE_TOPIC, topic: this.topic})
        );
    };

    isConnected = () => {
        return ApiConnector.isConnected();
    };
}

export default new ApiService();