import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 150,
        minHeight: 150,
        objectFit: 'cover'
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
                    <Typography variant='body1'><b>Category :</b> {category}</Typography>
                    <Typography variant='body2'>{date}</Typography>
                    <Typography variant='body1'>{description}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Incident);
