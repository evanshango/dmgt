import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import {Link} from "react-router-dom";
import {AccountCircle, ExitToApp, Home, Map, Notifications, People} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;
const styles = theme => ({
    ...theme.styling,
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: 'black',
        color: 'white'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
});

class SideNav extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar}/>
                <Typography className='spacingText' style={{textAlign: 'center', textTransform: 'uppercase'}}
                            noWrap={false}>Navigation Menu
                </Typography>
                <Link to={'/'} className='iconColor'>
                    <Home className='iconSpacing'/>
                    <span className='spacingText'>Home</span>
                </Link>
                <Link to={'/dashboard'} className='iconColor'>
                    <Notifications className='iconSpacing'/>
                    <span className='spacingText'>Notifications</span>
                    <Badge style={{marginTop: '30px'}} badgeContent={20} color='secondary'/>
                </Link>
                <Link to={'/dashboard'} className='iconColor'>
                    <People className='iconSpacing'/>
                    <span className='spacingText'>Users</span>
                </Link>
                <Link to={'/dashboard'} className='iconColor'>
                    <Map className='iconSpacing'/>
                    <span className='spacingText'>Incidents</span>
                </Link>
                <Link to={'/dashboard'} className='iconColor'>
                    <AccountCircle className='iconSpacing'/>
                    <span className='spacingText'>Account</span>
                </Link>
                <Link to={'/dashboard'} className='iconColor'>
                    <ExitToApp className='iconSpacing'/>
                    <span className='spacingText'>SignOut</span>
                </Link>
            </Drawer>
        );
    }
}

export default withStyles(styles)(SideNav);
