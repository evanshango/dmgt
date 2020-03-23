import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import logo from '../../assets/dmgt.png'
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const styles = theme => ({
    ...theme.styling,
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%"
        },
        zIndex: theme.zIndex.drawer + 1
    }
});

class Navbar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <Link to={'/dashboard'} style={{display: 'flex', alignItems: 'center'}} className='iconColor'>
                        <img src={logo} alt="app-logo" className='logoSize'/>
                        <Typography variant="h6" noWrap>Disaster Management</Typography>
                    </Link>
                    <div className='nav-container'>
                        <Button color='inherit' component={Link} to='/signin'>Signin</Button>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Navbar);
