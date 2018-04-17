import React, { Component } from 'react';
import Clock from 'react-live-clock';
import axios from 'axios';
import TimesContainer from './TimesContainer.js';
import sun__light__cloud from  '../Assets/Res/Icons/Piskelclear.gif'

import '../Assets/Stylesheets/App.css';
const test = 'https://piskel-imgstore-b.appspot.com/img/a20656d7-4215-11e8-840c-bfe4a4aff865.gif'


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
          <TimesContainer />
          <Clock className='clock'format={'HH:mm'} ticking={true} timezone={'Europe/Stockholm'} />
          <div>
          <div className='Header__temperature__gif--group'>
          <img className = 'App__gif--rain'
          src={test}/> 
          <p className='temp'> {this.state.temp}°C </p>
          </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
