import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';

const MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_KEY;

class MapContainer extends Component {
    state = {viewport: null, isClicked: false};

    componentDidMount() {
        const {_latitude, _longitude} = this.props.incident.geoPoint;
        this.setState({viewport: {latitude: _latitude, longitude: _longitude, zoom: 14}})
    }

    handleClick = event => {
        event.preventDefault();
        this.setState({isClicked: true})
    };
    handleClose = () => {
        this.setState({isClicked: false})
    };

    render() {
        const {viewport, isClicked} = this.state;
        const {_latitude, _longitude} = this.props.incident.geoPoint;
        return (
            <div style={{height: '20rem'}}>
                <ReactMapGL {...viewport} width='100vw%' height='100%' mapboxApiAccessToken={MAP_BOX_TOKEN}
                            mapStyle='mapbox://styles/evanshango/ck8f3rc4r0sqx1inv1zeaczas'
                            onViewportChange={viewport => this.setState({viewport})}>
                    <Marker latitude={_latitude} longitude={_longitude}>
                        <RoomIcon color='secondary' onClick={this.handleClick}/>
                    </Marker>
                    {isClicked ? (
                        <Popup latitude={_latitude} longitude={_longitude} onClose={this.handleClose}>
                            <div>
                                <h3>{this.props.incident.category}</h3>
                                <p>{this.props.incident.description}</p>
                            </div>
                        </Popup>
                    ) : null}
                </ReactMapGL>
            </div>
        );
    }
}

export default MapContainer;
