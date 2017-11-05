import React, { Component } from 'react';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      invalidEvent: false,
      eventName: '',
      eventLocation: '',
      eventDate: '',
      eventCost: '',
      eventDescription: ''
    }

  }

  eventInfo = () => {
    const name = document.getElementById('event-name').value;
    const location = document.getElementById('event-location').value;
    const date = document.getElementById('event-date').value;
    const cost = document.getElementById('event-cost').value;
    const description = document.getElementById('event-description').value;
    if( name.length && location.length && date.length && cost.length >= 1) {
      this.props.exitLogin()
    } else {
      this.setState({ invalidEvent: true });
    }
  }

  render() {

    const { exitLogin } = this.props;

    return (
      <div className='outer-drop-container'>
        <div className='drop-login-container'>
          <p className='drop-in-title'>Create Event</p>

          { this.state.invalidEvent && <div className='error-message'><p>INVALID:</p><p>Complete All Fields</p></div>}

          <input type='text' id='event-name' className='event-input' placeholder='Enter Event Name' value={this.state.eventName} onChange={e => this.setState({eventName: e.target.value})}/>

          <input type='text' id='event-location' className='event-input' placeholder='Enter Event Location' value={this.state.eventLocation} onChange={e => this.setState({eventLocation: e.target.value})}/>

          <input type='text' id='event-date' className='event-input' placeholder='Enter Event Date' value={this.state.eventDate} onChange={e => this.setState({eventDate: e.target.value})}/>

          <input type='text' id='event-cost' className='event-input' placeholder='Enter Event Cost' value={this.state.eventCost} onChange={e => this.setState({eventCost: e.target.value})}/>

          <textarea type='text' id='event-description' className='event-description' placeholder='Enter Event Description' value={this.state.eventDescription} onChange={e => this.setState({eventDescription: e.target.value})}></textarea>

          <button className='nav-btn' onClick={ this.eventInfo }>Upload Event</button>
          <button className='nav-btn' onClick={ exitLogin }>Exit</button>

        </div>
      </div>
    );
  }
}

export default CreateEvent;
