import React, {Component} from 'react';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Incident from "../components/Incident";
import Profile from "../components/Profile";

const styles = {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'red'
};

class dashboard extends Component {

    state = {incidents: null};

    componentDidMount() {
        axios.get('/incidents').then(res => {
            this.setState({incidents: res.data})
        }).catch(err => console.log(err))
    }

    render() {
        let incidentsMarkup = this.state.incidents ? (
            this.state.incidents.map(incident => <Incident key={incident.incidentId} incident={incident}/>)) : (
            <p>Loading...</p>);
        return (
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
        );
    }
}

export default dashboard;
