import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

const APP_CONFIG = {
    PROTOCOL: "http:",
    HOST: "//localhost",
    PORT: ":8080",
    ENDPOINT: "/ws",
};

const API_URL = APP_CONFIG.PROTOCOL + APP_CONFIG.HOST + APP_CONFIG.PORT + APP_CONFIG.ENDPOINT;

class ApiConnector {
    constructor() {
        this.stompClient = Stomp.over(() => {
            return new SockJS(API_URL)
        });
        this.stompClient.reconnect_delay = 1000;
        this.stompClient.activate();
    }

    getConnector = () => {
        if(!this.isConnected()) {
            return;
        }
        return this.stompClient;
    };

    isConnected = () => {
        return this.stompClient && this.stompClient.connected;
    }
}

export default new ApiConnector();
