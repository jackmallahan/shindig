import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import DisplayPref from '../DisplayPref/DisplayPref';
import apiKey from '../apikey';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => {
  return (
    <div>
      <GoogleMap defaultZoom={13} defaultCenter={{ lat: props.currentLat, lng: props.currentLong }}>
        {props.isMarkerShown &&
          props.markerArray.map((marker, i) => {
            return (
              <Marker
                key={i}
                label={`${i + 1}`}
                position={{ lat: JSON.parse(marker.lat), lng: JSON.parse(marker.long) }}
              />
            );
          })}
      </GoogleMap>
      <div className="events-info">
        {props.markerArray.map((marker, i) => {
          const isFree = 'Free';
          return (
            <div>
              <h3 className="event-number">{`${i + 1}`}</h3>
              <h5 className="marker-name">{marker.name.text}</h5>
              <p className="marker-description">{marker.description.text}</p>
              <h5 className="is-free">{marker.isFree ? 'Free' : null}</h5>
            </div>
          );
        })}
      </div>
    </div>
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
              {
                description: event.description,
                name: event.name,
                isFree: event.is_free,
                lat: venue.latitude,
                long: venue.longitude,
                display: false,
              },
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

  toggleInfoWindow = markerObj => {
    console.log('clicked markerObj', markerObj);
    if (markerObj.display === false) {
      markerObj.display = true;
      this.setState({ isMarkerShown: true });
    } else {
      markerObj.display = false;
      this.setState({ isMarkerShown: true });
    }
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
            markerArray={this.state.markerArray}
            markerClick={this.markerClick}
            toggleInfoWindow={this.toggleInfoWindow}
          />
        </div>
      </div>
    );
  }
}

export default Map;
