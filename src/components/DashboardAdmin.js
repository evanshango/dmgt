import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import {getContacts} from "../redux/actions/dataActions";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Contact from "./Contact";

const styles = theme => ({
    ...theme.styling
});

class DashboardAdmin extends Component {

    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        const {data: {contacts, loading}} = this.props;
        let contactsMarkup = !loading ? (contacts.map(contact => <Contact key={contact.contactId} contact={contact}/>)
        ) : <p>Loading...</p>;
        return (
            <Grid container spacing={5}>
                <Grid item sm={3} xs={12}>

                </Grid>
                <Grid item sm={5} xs={12}>
                    {contactsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>

                </Grid>
            </Grid>
        );
    }
}

DashboardAdmin.propTypes = {
    getContacts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, {getContacts})(withStyles(styles)(DashboardAdmin));
