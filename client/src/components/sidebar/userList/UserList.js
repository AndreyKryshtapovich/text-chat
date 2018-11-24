import * as React from 'react';
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

class UserList extends React.Component {
    render() {
        const {users, currentUser} = this.props;

        return (
            users.map((userName, key) => {
                const avatarLabel = userName.slice(0, 2).toLocaleUpperCase();
                let backgroundColor = userName === currentUser ? 'blue' : 'green';
                const style = {
                    backgroundColor: backgroundColor,
                    color: 'white',
                };

                return <ListItem key={key}>
                    <ListItemIcon>
                        <Avatar
                            style={style}
                            children={avatarLabel}/>
                    </ListItemIcon>
                    <ListItemText>{userName}</ListItemText>
                </ListItem>
            })
        );
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentUser: PropTypes.string.isRequired,
};

export default UserList;