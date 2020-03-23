import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import SideNav from "../components/layouts/SideNav";
import MapContainer from "../components/map/MapContainer";

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

    constructor(props) {
        super(props);
        this.state = {latitude: null, longitude: null, userAddress: null}
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position, error) => {
                if (error == null) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.setState({latitude: lat, longitude: lng});
                    this.fetchUserAddress(lat, lng);
                } else {
                    this.checkErrors(error)
                }
            });
        } else {
            alert('Unable to access current location')
        }
    }

    fetchUserAddress = (lat, lng) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=${process.env.REACT_APP_MAP_KEY}`)
            .then(response => response.json())
            .then(data => {
                // this.setState({userAddress: data.results[0].formatted_address, latitude: lat, longitude: lng})
            }).catch(error => alert(error));
    };

    checkErrors = error => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert('Permission to access location denied');
                break;
            case  error.POSITION_UNAVAILABLE:
                alert('Location info unavailable');
                break;
            case error.TIMEOUT:
                alert('Location request timed out');
                break;
            case error.UNKNOWN_ERR:
                alert('An unknown error occurred');
                break;
            default:
                alert('An unknown error occurred')
        }
    };

    render() {
        const {classes} = this.props;
        const {latitude, longitude} = this.state;
        return (
            <div className={classes.root}>
                <SideNav/>
                <main className={classes.content}>
                    <MapContainer latitude={latitude} longitude={longitude}/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(dashboard);
