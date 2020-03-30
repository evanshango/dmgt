import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import Incident from "../components/Incident";
import Profile from "../components/Profile";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import DashboardAdmin from "../components/DashboardAdmin";
import {getIncidents} from "../redux/actions/dataActions";

const styles = {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'red'
};

class dashboard extends Component {

    componentDidMount() {
        this.props.getIncidents();
    }

    render() {
        const {admin, data: {incidents, loading}} = this.props;
        let incidentsMarkup = !loading ? (
                incidents.map(incident => <Incident key={incident.incidentId} incident={incident}/>)) :
            <p>Loading...</p>;
        return (
            <Fragment>
                {admin ? (
                    <DashboardAdmin/>
                ) : (
                    <Grid container spacing={5}>
                        <Grid item sm={3} xs={12}>
                            <h5 style={styles}>Contact Profile</h5>
                            <Profile/>
                        </Grid>
                        <Grid item sm={5} xs={12}>
                            <h5 style={styles}>Reported Incidents</h5>
                            {incidentsMarkup}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <h5 style={styles}>Incident Location</h5>
                        </Grid>
                    </Grid>
                )}
            </Fragment>
        );
    }
}

dashboard.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    admin: PropTypes.bool,
    getIncidents: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    admin: state.user.credentials.admin,
    data: state.data
});

export default connect(mapStateToProps, {getIncidents})(dashboard);
