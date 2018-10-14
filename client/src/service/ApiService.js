import ApiConnector from '../service/ApiConnector';

const PUBLIC_TOPIC = '/topic/public';
const ADD_USER_URL = '/app/chat.addUser';

class ApiService {

    onInitialConnection = (username) => {
        if (!ApiConnector.isConnected()) {
            return;
        }
        const connector = ApiConnector.getConnector();
        this.subscribe(PUBLIC_TOPIC, connector);
        connector.send(ADD_USER_URL,
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )
    };

    onMessageReceived = (payload) => {
        console.log('Msg Received', payload);
    };

    subscribe = (channel, connector) => {
        connector.subscribe(channel, this.onMessageReceived);
    };

    isConnected = () => {
        return ApiConnector.isConnected();
    };
}

export default new ApiService();