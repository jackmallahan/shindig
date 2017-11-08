import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import EventInfo from './EventInfo';
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
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: props.currentLat, lng: props.currentLong }}>
      {props.isMarkerShown &&
        props.markerArray.map((marker, i) => {
          console.log(marker);
          let isFree;
          if (marker.isFree) {
            isFree = 'Free';
          }
          let markerObj = {
            lat: JSON.parse(marker.lat),
            long: JSON.parse(marker.long),
            name: marker.name.text,
            description: marker.description.text,
            dispay: false,
          };
          let styleObj = { display: 'none' };
          return (
            <Marker
              key={i}
              position={{ lat: markerObj.lat, lng: markerObj.long }}
              onClick={() => {
                if (styleObj === { display: 'block' }) {
                  styleObj = { display: 'none' };
                } else {
                  styleObj = { display: 'block' };
                }
              }}
            >
              {
                <InfoWindow style={styleObj}>
                  <div>
                    <h5 className="marker-name">{markerObj.name}</h5>
                    <p className="marker-description">{markerObj.description}</p>
                    <h5 className="is-free">{isFree}</h5>
                  </div>
                </InfoWindow>
              }
            </Marker>
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
