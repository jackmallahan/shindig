// sort_by: distance
// location.within: 200mi
// location.latitude: 39.7508
// location.longitude: 104.9966

const fetchEvents = (locationWithin, lat, long) => {
  fetch(`https://www.eventbriteapi.com/v3/events/search/?sort_by=distance&location.within=${locationWithin}&location.latitude=${lat}&location.longitude=-${long}&start_date.keyword=today&token=FSMFIMMKBZMU5HR6LYN2`)
    .then(data => data.json())
    .then(data => console.log('data', data))
}

export default fetchEvents
