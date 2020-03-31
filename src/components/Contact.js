import React, {Component} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core";
import DeleteContact from "./DeleteContact";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

const styles = theme => ({
    ...theme.styling
});

class Contact extends Component {
    render() {
        const {classes, contact, user: {authenticated}} = this.props;
        const deleteContact = authenticated ? (<DeleteContact contact={contact}/>) : null;
        return (
            <Card className={classes.card}>
                <CardMedia image={contact.imageUrl} title='Incident Image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant='h6'><b className={classes.categoryStyle}>Name :</b>
                        <span className={classes.categoryTag}><b> {contact.contactName}</b></span>
                    </Typography>
                    {deleteContact}
                    <br/>
                    <Typography variant='body2'><b className={classes.categoryStyle}>Email :</b> {contact.contactEmail}
                    </Typography>
                    <br/>
                    <Typography variant='body1'><b className={classes.categoryStyle}>Number :</b> {contact.contactNo}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

Contact.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Contact));
