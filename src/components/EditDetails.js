import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {editContactDetails} from "../redux/actions/userActions";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MyButton from "../util/MyButton";

const styles = theme => ({
    ...theme.styling,
    button: {
        float: 'right'
    }
});

class EditDetails extends Component {
    state = {contactInfo: '', website: '', location: '', contactNo: '', open: false, errors: {}};

    componentDidMount() {
        const {credentials} = this.props;
        this.mapContactDetailsToState(credentials);
    }

    mapContactDetailsToState = credentials => {
        this.setState({
            contactInfo: credentials.contactInfo ? credentials.contactInfo : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
            contactNo: credentials.contactNo ? credentials.contactNo : '',
        });
    };

    handleOpen = () => {
        this.setState({open: true});
        this.mapContactDetailsToState(this.props.credentials)
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value, errors: {}})
    };

    handleSubmit = () => {
        const {contactNo, contactInfo, website, location} = this.state;
      const contactDetails = {contactNo, contactInfo, website, location};
      this.props.editContactDetails(contactDetails);
      this.handleClose();
    };

    render() {
        const {classes} = this.props;
        const {open, contactInfo, website, contactNo, location, errors} = this.state;
        return (
            <Fragment>
                <MyButton tip='Edit Contact Details' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary'/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit Contact Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='contactNo' type='text' label='CONTACT NUMBER' placeholder='Contact Number'
                                       className={classes.textField} value={contactNo} onChange={this.handleChange}
                                       fullWidth helperText={errors.contactNo} error={!!errors.contactNo}/>
                            <TextField name='contactInfo' type='text' label='CONTACT INFO' fullWidth value={contactInfo}
                                       placeholder='A short description about your organization' multiline rows='5'
                                       className={classes.textField} onChange={this.handleChange}
                                       helperText={errors.contactInfo} error={!!errors.contactInfo}/>
                            <TextField name='website' type='text' label='WEBSITE' className={classes.textField}
                                       placeholder='Your Organization Website' value={website} fullWidth
                                       onChange={this.handleChange}/>
                            <TextField name='location' type='text' label='LOCATION' placeholder='Your Location'
                                       className={classes.textField} value={location} onChange={this.handleChange}
                                       fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

EditDetails.prototypes = {
    editContactDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, {editContactDetails})(withStyles(styles)(EditDetails));
