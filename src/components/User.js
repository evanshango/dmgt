import React, {Component} from 'react';
import SideNav from "./layouts/SideNav";
import {withStyles} from "@material-ui/core";

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

class User extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <SideNav style={{position: 'fixed'}}/>
                <main className={classes.content}>
                    <h3>Users Page</h3>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(User);
