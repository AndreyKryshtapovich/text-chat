import * as React from 'react';
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

class UserList extends React.Component {
    render() {
        return (
            this.props.users.map((userName, key) => {
                const avatarLabel = userName.slice(0, 2).toLocaleUpperCase();
                return <ListItem key={key}>
                    <ListItemIcon>
                        <Avatar
                            style={{backgroundColor: 'green', color: 'white'}}
                            children={avatarLabel}/>
                    </ListItemIcon>
                    <ListItemText>{userName}</ListItemText>
                </ListItem>
            })
        );
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UserList;