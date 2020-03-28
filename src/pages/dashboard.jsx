import React, {Component} from 'react';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Incident from "../components/Incident";

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
                <Grid item sm={2} xs={12}>
                    <h4 style={{width: '100%', textAlign: 'center'}}>Navigation Menu</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                    {incidentsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Incident Location</p>
                </Grid>
            </Grid>
        );
    }
}

export default dashboard;
