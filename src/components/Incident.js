import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {dispatchHelp} from "../redux/actions/dataActions";
import DispatchHelp from "./DispatchHelp";

const styles = theme => ({
    ...theme.styling
});

class Incident extends Component {
    render() {
        const {classes, user: {authenticated}, incident} = this.props;

        const dispatchHelpButton = authenticated ? (
            <DispatchHelp incident={incident}/>
        ) : null;

        return (
            /** @namespace incident.imageUrl **/
            <Card className={classes.card}>
                <CardMedia image={incident.imageUrl} title='Incident Image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant='h6'><b className={classes.categoryStyle}>Category :</b>
                        <span className={classes.categoryTag}><b> {incident.category}</b></span>
                    </Typography>
                    {dispatchHelpButton}
                    <br/>
                    <Typography variant='body2'><b className={classes.categoryStyle}>Date :</b>
                        {incident.date}
                    </Typography>
                    <br/>
                    <Typography variant='body1'><b className={classes.categoryStyle}>Description :</b>
                        {incident.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

Incident.propTypes = {
    dispatchHelp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    incident: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    dispatchHelp
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Incident));
