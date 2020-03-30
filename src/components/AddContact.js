import React, {Component, Fragment} from 'react';
import MyButton from "../util/MyButton";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import {addContact} from "../redux/actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {clearErrors} from "../redux/actions/dataActions";

const styles = theme => ({
    ...theme.styling,
});

class AddContact extends Component {

    state = {open: false, contactEmail: '', contactName: '', contactNo: '', password: '', errors: {}};

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({contactEmail: '', contactName: '', contactNo: '', password: '', open: false, error: {}});
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({open: false, errors: {}})
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value, errors: {}})
    };

    handleSubmit = event => {
        event.preventDefault();
        const {contactEmail, contactName, contactNo, password} = this.state;
        const contactData = {contactEmail, contactName, contactNo, password};
        this.props.addContact(contactData);
    };

    render() {
        const {classes, UI: {loading}} = this.props;
        const {contactEmail, contactName, contactNo, password, open, errors} = this.state;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Add a new Contact'>
                    <AddIcon/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                         <CloseIcon/>
                    </MyButton>
                    <DialogContent>
                        <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>New Contact</span>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name='contactName' type='text' label='Contact Name' value={contactName} fullWidth
                                       placeholder='Enter Contact Name' className={classes.textField}
                                       onChange={this.handleChange} helperText={errors.contactName}
                                       error={!!errors.contactName}/>
                            <TextField name='contactEmail' type='email' label='Contact Email' value={contactEmail}
                                       fullWidth placeholder='Enter Contact Email' className={classes.textField}
                                       onChange={this.handleChange} helperText={errors.contactEmail}
                                       error={!!errors.contactEmail}/>
                            <TextField name='contactNo' type='text' label='Contact Number' value={contactNo} fullWidth
                                       placeholder='Contact Number' className={classes.textField}
                                       onChange={this.handleChange} helperText={errors.contactNo}
                                       error={!!errors.contactNo}/>
                            <TextField name='password' type='text' label='Password' value={password} fullWidth
                                       placeholder='Contact Password' className={classes.textField}
                                       onChange={this.handleChange} helperText={errors.password}
                                       error={!!errors.password}/>
                            <div style={{textAlign: 'center'}}>
                                <Button type='submit' variant='contained' color='primary' disabled={loading}
                                        className={classes.submitButton}>Submit
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progress} color='secondary'/>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

AddContact.propTypes = {
    addContact: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    contact: PropTypes.object
};

const mapStateToProps = state => ({
    UI: state.UI,
});

export default connect(mapStateToProps, {addContact, clearErrors})(withStyles(styles)(AddContact));
