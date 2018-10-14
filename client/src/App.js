import React from 'react';
import './App.css';
import NamePicker from './components/namePicker/NamePicker';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen: true};
    }

    render() {
        return <NamePicker
            modalOpen={this.state.modalOpen}
            onNamePicked={this.onNamePicked}/>
    }

    onNamePicked = () => {
        this.setState({modalOpen: false});
    }
}

export default App;
