import React, {Component, Fragment} from 'react';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {dispatchHelp} from "../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TelegramIcon from '@material-ui/icons/Telegram';
import MyButton from "../util/MyButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MapContainer from "./map/MapContainer";

const styles = theme => ({
    ...theme.styling,
});

class DispatchHelp extends Component {

    state = {open: false};

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    dispatchHelp = () => {
        this.props.dispatchHelp(this.props.incident.incidentId);
        this.setState({open: false})
    };

    render() {
        const {classes, incident} = this.props;
        const {open} = this.state;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} btnClassName={classes.btnFont} tip='Dispatch Help'>
                    <TelegramIcon color='secondary'/>
                </MyButton>
                <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton onClick={this.handleClose} tip='Close' tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        <Grid container>
                            <Grid item sm={4}>
                                <img src={incident.imageUrl} alt="IncidentImage" className={classes.incidentImage}/>
                            </Grid>
                            <Grid item sm={8}>
                                <Typography variant='body1'>Category: {incident.category}</Typography>
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variant='body2' color='textSecondary'>
                                    GeoPoints: <b>Lat:</b> {incident.geoPoint._latitude}
                                    <b>Lng:</b> {incident.geoPoint._longitude}
                                </Typography>
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variant='body1'>Time: {incident.time}</Typography>
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variant='body1'>Description: {incident.description}</Typography>
                            </Grid>
                            <hr className={classes.invisibleSeparator}/>
                            <Grid item sm={12} style={{width: '100%'}}>
                                {/*<MapContainer latitude={_latitude} longitude={_longitude}/>*/}
                                <MapContainer incident={incident}/>
                            </Grid>
                            <Grid item sm={12} style={{textAlign: 'center'}}>
                                <Button variant='contained' className={classes.button} onClick={this.dispatchHelp}
                                        color='primary'>OK
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

DispatchHelp.propTypes = {
    incident: PropTypes.object.isRequired,
    dispatchHelp: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(null, {dispatchHelp})(withStyles(styles)(DispatchHelp));
