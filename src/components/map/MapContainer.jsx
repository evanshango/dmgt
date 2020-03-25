import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IncidentItem from "../IncidentItem";

const cardStyle = {
    position: 'relative',
    width: '100%',
    height: '85vh',
};

class MapContainer extends Component {

    state = {showInfoWindow: false, activeMarker: {}, selectedPlace: {}};

    onMarkerClick = (props, marker) => {
        this.setState({selectedPlace: props, activeMarker: marker, showInfoWindow: true})
    };

    onClose = () => {
        if (this.state.showInfoWindow) {
            this.setState({showInfoWindow: false, activeMarker: null});
        }
    };

    render() {
        const {selectedPlace, activeMarker, showInfoWindow} = this.state;
        const {latitude, longitude} = this.props;
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    <Card style={cardStyle}>
                        <Map google={this.props.google} zoom={16} initialCenter={{lat: latitude, lng: longitude}}>
                            <Marker onClick={this.onMarkerClick} name={'I am here'}
                                    icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}/>
                            <InfoWindow marker={activeMarker} visible={showInfoWindow} onClose={this.onClose}>
                                <div>
                                    <h4>{selectedPlace.name}</h4>
                                </div>
                            </InfoWindow>
                        </Map>
                    </Card>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <IncidentItem/>
                </Grid>
            </Grid>
        );
    }
}

export default GoogleApiWrapper({apiKey: process.env.REACT_APP_MAP_KEY})(MapContainer)

