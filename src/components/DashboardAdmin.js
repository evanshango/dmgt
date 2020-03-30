import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";

class DashboardAdmin extends Component {
    render() {
        return (
            <Grid container spacing={5}>
                <Grid item sm={3} xs={12}>

                </Grid>
                <Grid item sm={5} xs={12}>
                    <h4>Rendering something</h4>
                </Grid>
                <Grid item sm={4} xs={12}>

                </Grid>
            </Grid>
        );
    }
}

export default DashboardAdmin;
