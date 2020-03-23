import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import SideNav from "../components/layouts/SideNav";
import Map from "../components/Map";
import Grid from "@material-ui/core/Grid";
import IncidentItem from "../components/IncidentItem";

const drawerWidth = 240;
const styles = theme => ({
    ...theme.styling,
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
});

class dashboard extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <SideNav/>
                <main className={classes.content}>
                    <Grid container spacing={5}>
                        <Grid item sm={8} xs={12}>
                            <Map/>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <IncidentItem/>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(dashboard);
