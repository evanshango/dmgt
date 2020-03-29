import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import PhoneIcon from '@material-ui/icons/Phone';
import MuiLink from '@material-ui/core/Link'
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from "@material-ui/core/Tooltip";
import {uploadImage, logoutUser} from "../redux/actions/userActions";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import EditDetails from "./EditDetails";

const styles = theme => ({
    paper: {padding: 20},
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 180,
            height: 180,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
            border: '1px solid grey'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Profile extends Component {

    handleImageChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes, user: {
                credentials: {imageUrl, contactName, contactInfo, contactNo, location, website},
                loading, authenticated
            }
        } = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="Profile" className='profile-image'/>
                        <input type='file' id='imageInput' hidden='hidden'
                               onChange={this.handleImageChange}/>
                        <Tooltip title='Edit Profile Picture' placement='top-start'>
                            <IconButton onClick={this.handleEditPicture} className='button'>
                                <EditIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink variant='h6'>
                            @{contactName}
                        </MuiLink>
                        <hr/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {contactNo && (
                                <Fragment>
                                    <PhoneIcon color='primary'/> <span>{contactNo}</span>
                                    <hr/>
                                </Fragment>
                            )}
                            {location && (
                                <Fragment>
                                    <LocationOn color='primary'/> <span>{location}</span>
                                    <hr/>
                                </Fragment>
                            )}
                        </div>
                        <hr/>
                        {contactInfo &&
                        <Typography variant='body2' style={{textAlign: 'justify'}}>{contactInfo}</Typography>}
                        <hr/>
                        {website && (
                            <Fragment>
                                <LinkIcon color='primary'/>
                                <a href={website} target='_blank' rel='noopener noreferrer'>{' '}{website}</a>
                                <hr/>
                            </Fragment>
                        )}
                    </div>
                    <Tooltip title='Logout' placement='top'>
                        <IconButton onClick={this.handleLogout}>
                            <PowerSettingsNewIcon color='secondary'/>
                        </IconButton>
                    </Tooltip>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>No Profile found. Please Login again</Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/signin'
                            style={{minWidth: '110px'}}>Login</Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'
                            style={{minWidth: '110px'}}>Register</Button>
                </div>
            </Paper>
        )) : (<p>Loading...</p>);
        return (
            profileMarkup
        );
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser,
    uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
