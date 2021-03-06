import React from 'react';
import './App.css';
import NamePicker from './components/namePicker/NamePicker';
import Chat from './components/chat/Chat';
import Sidebar from "./components/sidebar/Sidebar";
import Transformer from './service/transformer/Transformer';
import {MESSAGE_TYPES} from "./common/Constants";
import ApiService from "./service/ApiService";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen: true, messages: [], users: []};
    }

    render() {
        const {modalOpen} = this.state;
        return (
            <div>
                <NamePicker
                    modalOpen={modalOpen}
                    onNamePicked={this.onNamePicked}
                    onMessageReceived={this.onMessageReceived}/>
                {!modalOpen && this.renderAppComponents()}
            </div>
        );
    }

    onNamePicked = (username) => {
        this.setState({modalOpen: false});
        this.setState({currentUser: username});
    };

    onMessageReceived = (payload) => {
        const message = Transformer.transformMessage(payload);
        if (MESSAGE_TYPES.JOIN === message.type) {
            this.processUserJoined(message);
        } else if (MESSAGE_TYPES.LEAVE_CHAT === message.type) {
            this.processUserLeft(message)
        } else if (MESSAGE_TYPES.CHAT === message.type || MESSAGE_TYPES.LEAVE_TOPIC === message.type) {
            this.addMessage(message);
        } else if (MESSAGE_TYPES.ALL_USERS === message.type) {
            this.setState({users: JSON.parse(message.content)});
        } else if (MESSAGE_TYPES.ALL_TOPICS === message.type) {
            this.setState({topics: JSON.parse(message.content)});
        }
    };

    processUserJoined = (message) => {
        this.addUser(message.sender);
        this.addMessage(message)
    };

    processUserLeft = (message) => {
        this.removeUser(message.sender);
        this.addMessage(message);
    };

    removeUser = (targetUser) => {
        let users = this.state.users;
        users = users.filter(user => user !== targetUser);
        this.setState({users});
    };

    addUser = (userName) => {
        let users = this.state.users;
        if (!users.includes(userName)) {
            users.push(userName);
            this.setState({users});
        }
    };

    addMessage = (message) => {
        let messages = this.state.messages;
        messages.push(message);
        this.setState({messages});
    };

    renderAppComponents = () => {

        return (
            <div>
                <Sidebar users={this.state.users}/>
                <Chat messages={this.state.messages} currentUser={this.state.currentUser}/>
            </div>);
    };
}

export default App;
