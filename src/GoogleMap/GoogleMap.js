import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import DisplayPref from '../DisplayPref/DisplayPref';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => {
  return (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: props.currentLat, lng: props.currentLong }}>
      {props.isMarkerShown &&
        props.markerArray.map((marker, i) => {
          console.log(marker);
          return (
            <Marker
              key={i}
              position={{ lat: JSON.parse(marker.lat), lng: JSON.parse(marker.long) }}
            />
          );
        })}
    </GoogleMap>
  );
});

class Map extends Component {
  constructor() {
    super();
    this.state = {
      isMarkerShown: false,
      markerArray: [],
    };
  }

  componentDidMount() {
    this.props.userEvents.forEach(event => {
      fetch(`https://www.eventbriteapi.com/v3/venues/${event.venue_id}/?token=FSMFIMMKBZMU5HR6LYN2`)
        .then(venue => venue.json())
        .then(venue =>
          this.setState({
            markerArray: [
              ...this.state.markerArray,
              { lat: venue.latitude, long: venue.longitude },
            ],
          }),
        );
    });
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    const { userPreferences, currentLat, currentLong } = this.props;
    console.log(this.state);
    return (
      <div className="backdrop">
        <div className="map-container">
          <MyMapComponent
            currentLat={currentLat}
            currentLong={currentLong}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            markerArray={this.state.markerArray}
          />
        </div>
        < DisplayPref
          userPreferences={this.userPreferences}
          userAuthId={this.props.userAuthId}
        />
      </div>
    );
  }
}

export default Map;
