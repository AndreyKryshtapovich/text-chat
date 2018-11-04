import React from 'react';
import './App.css';
import NamePicker from './components/namePicker/NamePicker';
import Chat from './components/chat/Chat';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen: true, messages: []};
    }

    render() {
        const chat = this.state.modalOpen ? '' : <Chat messages={this.state.messages} currentUser={this.state.username}/>;
        return (
            <div>
                <NamePicker
                    modalOpen={this.state.modalOpen}
                    onNamePicked={this.onNamePicked}
                    onMessageReceived={this.onMessageReceived}/>
                {chat}
            </div>
        );
    }

    onNamePicked = (username) => {
        this.setState({username: username, modalOpen: false});
    };

    onMessageReceived = (payload) => {
        let messages = this.state.messages;
        messages.push(JSON.parse(payload.body));
        this.setState({messages});
    }
}

export default App;
