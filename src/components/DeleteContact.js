import React, {Component, Fragment} from 'react';
import MyButton from "../util/MyButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const styles = theme => ({
    ...theme.styling
});

class DeleteContact extends Component {

    state = {open: false};

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const {classes} = this.props;
        const {open} = this.state;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} btnClassName={classes.btnFont} tip='Delete Contact'>
                    <DeleteOutlineIcon color='secondary'/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogContent>
                        You are about to delete a contact. Remember this action is irreversible. Click OK to proceed
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        <Button color='primary'>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteContact.propTypes = {
    contact: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(withStyles(styles)(DeleteContact));
