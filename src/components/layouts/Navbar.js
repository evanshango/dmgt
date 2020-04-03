import React, {Component, Fragment} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {logoutUser} from "../../redux/actions/userActions";
import Exit from '@material-ui/icons/ExitToApp';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddContact from "../AddContact";

class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {authenticated, admin} = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Fragment>
                            {admin ? (
                                <Fragment>
                                    <AddContact/>
                                    <Tooltip title='Logout' placement='right-end'>
                                        <IconButton onClick={this.handleLogout}>
                                            <Exit color='primary'/>
                                        </IconButton>
                                    </Tooltip>
                                </Fragment>
                            ) : null}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color='inherit' component={Link} to={'/'}>Home</Button>
                            <Button color='inherit' component={Link} to={'/signin'}>Contact</Button>
                            <Button color='inherit' component={Link} to={'/login/admin'}>Admin</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    admin: PropTypes.bool
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    admin: state.user.credentials.admin
});


export default connect(mapStateToProps, {logoutUser})(Navbar);
