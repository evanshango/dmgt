import React, {Component, Fragment} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {addContentInfo, clearErrors} from "../redux/actions/dataActions";
import AddIcon from "@material-ui/icons/Add";
import MyButton from "../util/MyButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
    ...theme.styling
});

class EducationalForm extends Component {

    state = {name: '', extraInfo: '', errors: {}, open: false};

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({name: '', extraInfo: '', open: false, errors: {}});
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({open: false})
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value, errors: {}})
    };

    handleSubmit = event => {
        event.preventDefault();
        const educationalData = {name: this.state.name, extraInfo: this.state.extraInfo};
        this.props.addContentInfo(educationalData, this.props.infoId);
    };

    render() {
        const {classes, infoType, UI: {loading}} = this.props;
        const {name, extraInfo, errors, open} = this.state;
        return (
            <Fragment>
                <MyButton tip='Add General Information' onClick={this.handleOpen}>
                    <AddIcon color='primary'/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent>
                        <span style={{textTransform: 'uppercase', fontWeight: 'bold'}}>{infoType} Content</span>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name='name' type='text' label='Name' fullWidth className={classes.textField}
                                       placeholder='Enter Name' onChange={this.handleChange} value={name}
                                       helperText={errors.name} error={!!errors.name}/>
                            <TextField name='extraInfo' type='text' label='Information' fullWidth value={extraInfo}
                                       multiline
                                       className={classes.textField} placeholder='Enter Additional Information' rows='5'
                                       onChange={this.handleChange}/>
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

EducationalForm.propTypes = {
    UI: PropTypes.object.isRequired,
    infoId: PropTypes.string.isRequired,
    infoType: PropTypes.string.isRequired,
    addContentInfo: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, {addContentInfo, clearErrors})(withStyles(styles)(EducationalForm));
