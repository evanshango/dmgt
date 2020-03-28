import React, {Component} from 'react';
import {useTheme, withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton, Typography, Drawer, Divider, Badge} from "@material-ui/core";
import {
    Menu, People, AccountCircle, Map, ExitToApp, ChevronLeft, ChevronRight, Notifications, Dashboard
} from '@material-ui/icons'
import clsx from "clsx";
import logo from '../../assets/dmgt.png';
import {Link} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    logoSize: {
        height: '35px',
        width: '35px',
        padding: 10
    },
    paper: {
        background: 'black',
        color: 'white'
    },
    dividerColor: {
        backgroundColor: 'white',
        margin: 10
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    iconColor: {
        color: 'white',
        textDecoration: 'none',
        alignItems: 'center',
        display: 'flex'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    profile: {
        alignItems: 'center',
        display: 'flex',
        margin: '5px',
        '& .profile-image': {
            width: 40,
            height: 40,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
            border: '1px solid grey',
            margin: 5
        }
    },
});

class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {isDrawerOpen: true, theme: useTheme}
    }

    handleDrawerToggle = () => {
        this.setState({isDrawerOpen: !this.state.isDrawerOpen})
    };

    render() {
        const {classes} = this.props;
        const {isDrawerOpen, theme} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position='fixed' className={clsx(classes.appBar, {[classes.appBarShift]: isDrawerOpen,})}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle}
                                    edge="start">
                            <Menu/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant='permanent' className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isDrawerOpen, [classes.drawerClose]: !isDrawerOpen
                })} classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isDrawerOpen, [classes.drawerClose]: !isDrawerOpen,
                    }, [classes.paper]),
                }}>
                    <div style={{display: 'flex', padding: 4}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={logo} alt="app-logo" className={classes.logoSize}/>
                            <Typography variant="h6" noWrap>DMgt</Typography>
                        </div>
                        <div className={classes.toolbar} style={{position: 'absolute', right: '0'}}>
                            <IconButton onClick={this.handleDrawerToggle} className={classes.iconColor}>
                                {theme.direction === 'rtl' ? <ChevronRight/> : <ChevronLeft/>}
                            </IconButton>
                        </div>
                    </div>
                    <Divider className={classes.dividerColor}/>
                    <div className={classes.profile}>
                        <img className='profile-image' src='https://randomuser.me/api/portraits/men/20.jpg'
                             alt="profile"/>
                        <Typography style={{margin: '0 0 0 20px', fontSize: '12px'}}>
                            John Doe
                            <br/>
                            22 March 2020
                        </Typography>
                    </div>
                    <Divider className={classes.dividerColor}/>
                    <Link to={'/dashboard'} className={classes.iconColor}>
                        <Dashboard className='iconSpacing'/>
                        <span style={{padding: 20}}>Dashboard</span>
                    </Link>
                    <Link to={'/dashboard'} className={classes.iconColor}>
                        <Notifications className='iconSpacing'/>
                        <span style={{padding: 20}}>Notifications</span><Badge badgeContent={20} color='secondary'/>
                    </Link>
                    <Link to={'/users'} className={classes.iconColor}>
                        <People className='iconSpacing'/>
                        <span style={{padding: 20}}>Users</span>
                    </Link>
                    <Link to={'/dashboard'} className={classes.iconColor}>
                        <Map className='iconSpacing'/>
                        <span style={{padding: 16}}>Incidents</span>
                    </Link>
                    <Link to={'/dashboard'} className={classes.iconColor}>
                        <AccountCircle className='iconSpacing'/>
                        <span style={{padding: 20}}>Account</span>
                    </Link>
                    <Link to={'/dashboard'} className={classes.iconColor}>
                        <ExitToApp className='iconSpacing'/>
                        <span style={{padding: 20}}>SignOut</span>
                    </Link>
                </Drawer>

            </div>
        );
    }
}

export default withStyles(styles)(SideNav);
