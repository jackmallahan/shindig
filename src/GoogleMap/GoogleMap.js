import React, { Component } from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='map' />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  let markerDisplay = props.markerArray.forEach(marker =>
    <Marker position={{ lat: marker.lat, lng: marker.long }} onClick={props.onMarkerClick} />
  )
  return <GoogleMap
  defaultZoom={8}
  defaultCenter={{ lat: props.currentLat, lng: props.currentLong }}
  >
  { props.isMarkerShown && markerDisplay}
  </GoogleMap>
})

class Map extends Component {
  constructor(){
    super();
    this.state = {
      isMarkerShown: true,
      markerArray: []
    }
  }

  componentDidMount() {
    this.props.userEvents.forEach(event => {
      fetch(`https://www.eventbriteapi.com/v3/venues/${event.venue_id}/?token=FSMFIMMKBZMU5HR6LYN2`)
        .then(venue => venue.json())
        .then(venue => this.setState({ markerArray: [...this.state.markerArray, {lat: venue.latitude, long: venue.longitude}] }));
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className='map-container'>
        <MyMapComponent
          currentLat={this.props.currentLat}
          currentLong={this.props.currentLong}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          markerArray={this.state.markerArray}
        />
      </div>
    )
  }
}

export default Map;
