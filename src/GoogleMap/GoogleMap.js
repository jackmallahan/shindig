import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import apiKey from '../apikey';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map" />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <div>
      <GoogleMap defaultZoom={13} defaultCenter={{ lat: props.currentLat, lng: props.currentLong }}>
        {props.userAuthId
          ? props.filteredEvents.map((marker, i) => {
              return (
                <Marker
                  key={i}
                  label={`${i + 1}`}
                  position={{ lat: JSON.parse(marker.lat), lng: JSON.parse(marker.long) }}
                />
              );
            })
          : props.markerArray.map((marker, i) => {
              return (
                <Marker
                  key={i}
                  label={`${i + 1}`}
                  position={{ lat: JSON.parse(marker.lat), lng: JSON.parse(marker.long) }}
                />
              );
            })}
      </GoogleMap>
    </div>
  );
});

class Map extends Component {
  constructor() {
    super();
    this.state = {
      isMarkerShown: false,
      markerArray: [],
      filteredEvents: []
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
                categoryId: event.category_id,
                venueId: event.venue_id
              }
            ]
          })
        )
        .then(() =>
          this.setState({
            filteredEvents: this.state.markerArray.filter(marker => this.props.userPrefs.includes(marker.categoryId))
          })
        );
      this.delayedShowMarker();
    });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    const { userPrefs, currentLat, currentLong, userAuthId } = this.props;
    return (
      <div>
        <div className="map-container">
          <MyMapComponent
            currentLat={currentLat}
            currentLong={currentLong}
            isMarkerShown={this.state.isMarkerShown}
            markerArray={this.state.markerArray}
            markerClick={this.markerClick}
            toggleInfoWindow={this.toggleInfoWindow}
            filteredEvents={this.state.filteredEvents}
            userAuthId={userAuthId}
          />
        </div>
        <div className="events-info-container">
          {this.state.filteredEvents.map((marker, i) => {
            return (
              <div className="events-info" key={i}>
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
  }
}

export default Map;
