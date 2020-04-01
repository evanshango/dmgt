import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {LockOutlined} from "@material-ui/icons";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import {loginAdmin, loginUser} from "../redux/actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(3, 0, 2),
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    },
    customError: {
        color: 'red',
        fontSize: "0.8rem",
        marginTop: 10,
        textAlign: 'center'
    }
});

class signin extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', errors: {}};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const userData = {email: this.state.email, password: this.state.password};
        if (userData.email === 'admin@admin.com')
            this.props.loginAdmin(userData, this.props.history);
        else
            this.props.loginUser(userData, this.props.history)
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value, errors: {}})
    };

    render() {
        const {classes, UI: {loading}} = this.props;
        const {email, password, errors} = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField variant="outlined" margin="normal" required fullWidth id="email" type='email'
                                   label="Email Address" name="email" value={email} onChange={this.handleChange}
                                   helperText={errors.email} error={!!errors.email}>
                        </TextField>
                        <TextField variant="outlined" margin="normal" required fullWidth name="password"
                                   value={password} label="Password" type="password" id="password"
                                   helperText={errors.password} error={!!errors.password} onChange={this.handleChange}/>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.button}
                                disabled={loading}>
                            Sign In
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} color='secondary'/>
                            )}
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

signin.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    loginAdmin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser,
    loginAdmin
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signin));
