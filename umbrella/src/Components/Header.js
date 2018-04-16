import React, { Component } from 'react';
import Clock from 'react-live-clock';
import axios from 'axios';
import TimesContainer from './TimesContainer.js';

import '../Assets/Stylesheets/App.css';

const URL = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=9743140833919d56c2c140b9c34016f5&units=metric';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      date: new Date(),
      temp: 'Fetching weather <--> '
    };
  }

  componentWillMount(){
    this.getWeather();
    setInterval(() => {
      this.getWeather();
    },600000);
  }

  async getWeather() {
    try {
      const response = await axios.get(URL);
      console.log(response.data)
      this.setState({ temp: Math.round(response.data.main.temp)})
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <header className='App-header'>
          <p> Mot TC: </p>
          <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Stockholm'} />
          <div className='Header__temperature__gif--group'>
          <p> {this.state.temp} °C </p>
          <img className = 'App__gif--rain'
          src={'https://static1.squarespace.com/static/5394702fe4b092dc8ae3d015/539c77b2e4b05219d5bd8b95/53b1805fe4b0732f8676875d/1404141706865/cloud.gifformat=1000w'}/> 
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
