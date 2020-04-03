import React, {Component, Fragment} from 'react';
import Card from "@material-ui/core/Card";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ViewDetails from "./ViewDetails";
import MyButton from "../util/MyButton";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddGeneralInfo from "./AddGeneralInfo";

/**@namespace info.infoType **/
const styles = theme => ({
    ...theme.styling,
    buttonMore: {
        left: '85%',
        position: 'absolute',
    },
    typographyText: {
        textTransform: 'uppercase',
        position: 'absolute',
        left: '30%'
    }
});

class GeneralInfoItem extends Component {

    state = {open: false};

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const {classes, info, authenticated} = this.props;
        const {open} = this.state;
        return (
            <Card className={classes.card}>
                <CardContent classes={classes.content}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {authenticated && (
                            <AddGeneralInfo info={info}/>
                        )}
                        <Typography variant='body2' className={classes.typographyText}>
                            {info.infoType}
                        </Typography>
                        {authenticated && (
                            <Fragment>
                                <MyButton onClick={this.handleOpen} tip='View Details'
                                          btnClassName={classes.buttonMore}>
                                    <UnfoldMoreIcon/>
                                </MyButton>
                                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                                    <MyButton onClick={this.handleClose} tip='Close' tipClassName={classes.closeButton}>
                                        <CloseIcon/>
                                    </MyButton>
                                    <DialogTitle>{info.infoType}</DialogTitle>
                                    <DialogContent>
                                        <ViewDetails infoId={info.infoId} infoType={info.infoType}/>
                                    </DialogContent>
                                </Dialog>
                            </Fragment>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

GeneralInfoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(GeneralInfoItem));
