import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from "@material-ui/core/Drawer/Drawer";
import {TABS} from '../../common/Constants';
import PropTypes from 'prop-types';
import UserList from "./userList/UserList";
import TopicList from "./topicList/TopicList";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tabIndex: 0};
    }

    render() {
        return (
            <Drawer open={true} variant={"permanent"}>
                <AppBar position="static" color="primary">
                    <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
                        <Tab label={TABS.USERS_TAB}/>
                        <Tab label={TABS.TOPICS_TAB}/>
                    </Tabs>
                </AppBar>
                {this.state.tabIndex === 0 &&
                <UserList users={this.props.users} currentUser={this.props.currentUser}/>}
                {this.state.tabIndex === 1 &&
                <TopicList topics={this.props.topics} onTopicChanged={this.props.onTopicChanged}/>
                }
            </Drawer>
        );
    }

    handleTabChange = (event, value) => {
        this.setState({tabIndex: value});
    }
}

Sidebar.propTypes = {
    users: PropTypes.arrayOf(PropTypes.string).isRequired,
    topics: PropTypes.arrayOf(PropTypes.shape({
        displayName: PropTypes.string,
        topicId: PropTypes.string,
    })).isRequired,
    currentUser: PropTypes.string.isRequired,
    onTopicChanged: PropTypes.func.isRequired,
};

export default Sidebar;