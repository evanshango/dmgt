import React, {Component} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    <Button color='inherit' component={Link} to={'/'}>Home</Button>
                    <Button color='inherit' component={Link} to={'/signin'}>Signin</Button>
                    <Button color='inherit' component={Link} to={'/signup'}>New Contact</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;
