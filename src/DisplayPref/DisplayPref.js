import React, { Component } from "react";

class DisplayPref extends Component {
  constructor() {
    super();
  }

  fetchUserData = (userId) => {
    fetch(`/api/v1/joint_tables/${userId}`)
      .then(response => response.json())
      .then(response => { return response })
      .then(response => this.showUserPreferences(response))
  }

  showUserPreferences = (response) => {
    const container = document.querySelector('.pref-container')

    response.forEach(preference => {
      container.append(`
        ${preference.name}
        `)
    })
  }

  componentDidMount() {
    this.fetchUserData(this.props.userAuthId)
  }

  render() {
    return (
      <div className='backdrop'>
        <div className='outer-display-pref-container'>
          <div className='drop-display-pref-container'>
            <p className='display-pref-title'>Your Preferences</p>
            <div className='pref-container'>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPref;
