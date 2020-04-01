import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import Incident from "../components/Incident";
import Profile from "../components/Profile";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import DashboardAdmin from "../components/DashboardAdmin";
import {getGeneralInfo, getIncidents} from "../redux/actions/dataActions";
import GeneralInfoItem from "../components/GeneralInfoItem";

const styles = {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'red'
};

/**@namespace info.infoId **/
class dashboard extends Component {

    componentDidMount() {
        this.props.getIncidents();
        this.props.getGeneralInfo();
    }

    render() {
        const {admin, data: {incidents, loading, generalInfo}} = this.props;
        let incidentsMarkup = !loading ? (
                incidents.map(incident => <Incident key={incident.incidentId} incident={incident}/>)) :
            <p>Loading...</p>;
        let generalInfoMarkup = !loading ? (generalInfo.map(info => <GeneralInfoItem key={info.infoId} info={info}/>)
        ) : <p>Loading...</p>;
        return (
            <Fragment>
                {admin ? (
                    <DashboardAdmin/>
                ) : (
                    <Grid container spacing={4}>
                        <Grid item sm={3} xs={12}>
                            <h5 style={styles}>Contact Profile</h5>
                            <Profile/>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <h5 style={styles}>Reported Incidents</h5>
                            {incidentsMarkup}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <h5 style={styles}>General Info</h5>
                            {generalInfoMarkup}
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
    getGeneralInfo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    admin: state.user.credentials.admin,
    data: state.data
});

export default connect(mapStateToProps, {getIncidents, getGeneralInfo})(dashboard);
