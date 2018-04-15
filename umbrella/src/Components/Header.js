import React, { Component } from 'react';
import Clock from 'react-live-clock';
import axios from 'axios';

import '../Assets/Stylesheets/App.css';

const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=9743140833919d56c2c140b9c34016f5&units=metric';

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
  }

  async getWeather() {
    try {
      const response = await axios.get(weatherUrl);
      this.setState({ temp: Math.round(response.data.main.temp)})
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Stockholm'} />
          <div className='Header__temperature__gif--group'>
          <p> {this.state.temp} °C </p>
          <img src={'https://thumbs.gfycat.com/SharpCalculatingIslandwhistler-size_restricted.gif'} className='App__gif--rain'/>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
