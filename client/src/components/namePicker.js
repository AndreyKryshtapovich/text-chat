import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class NamePicker extends React.Component {
    render() {
        const dialogStyle = {
            width: '400px'
        };
        return (
            <Dialog open={true}>
                <DialogTitle>Who are you ?</DialogTitle>
                <DialogContent
                    style={dialogStyle}>
                    <TextField
                        id="name"
                        autoFocus={true}
                        label="Nickname"
                        fullWidth={true}
                        required={true}
                    />
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained">
                            Subscribe
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>);
    }
}


export default NamePicker