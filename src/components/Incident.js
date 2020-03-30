import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {dispatchHelp} from "../redux/actions/dataActions";
import Button from "@material-ui/core/Button";

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 150,
        minHeight: 150,
        objectFit: 'cover'
    },
    categoryStyle: {
        color: 'green',
        textTransform: 'uppercase',
        fontSize: '12px'
    },
    categoryTag: {
        fontSize: '12px'
    }
};

class Incident extends Component {
    render() {
        const {
            classes, incident: {
                imageUrl, category, incidentId, description, date, time, geoPoint: {
                    _latitude, _longitude
                }
            }
        } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={imageUrl} title='Incident Image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant='h6'><b className={classes.categoryStyle}>Category :</b>
                        <span className={classes.categoryTag}><b> {category}</b></span>
                    </Typography>
                    <br/>
                    <Typography variant='body2'><b className={classes.categoryStyle}>Date :</b> {date}</Typography>
                    <br/>
                    <Typography variant='body1'><b className={classes.categoryStyle}>Description :</b> {description}
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
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    dispatchHelp
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Incident));
