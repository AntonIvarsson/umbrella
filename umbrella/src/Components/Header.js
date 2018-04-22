import React, { Component } from 'react';
import Clock from 'react-live-clock';
import axios from 'axios';
import TimesContainer from './TimesContainer.js';
import ReactSVG from 'react-svg'
import Safe from "react-safe"

import '../Assets/Stylesheets/App.css';
import '../Assets/Stylesheets/dxcweathericons.css'; 
import '../Assets/Stylesheets/styles.css';

import Clearnight from '../Assets/Res/Icons/images/clearNightIcon.svg'

const weatherIcons = {
  clearNight: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/clearNightIcon.svg'),
  lightning: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/lightningIcon.svg'),
  mostlyCloudy: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/mostlyCloudyIcon.svg'),
  partlyCloudy: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/partlyCloudyIcon.svg'),
  partlyCloudyNight: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/partlyCloudyNightIcon.svg'),
  rainy: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/rainyIcon.svg'),
  showers: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/showersIcon.svg'),
  snowShowers: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/snowShowersIcon.svg'),
  900: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/sunnyShowersIcon.svg'),
  1000: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/thermometerColdIcon.svg'),
  1100: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/thermometerHotIcon.svg'),
  1200: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/thundershowersIcon.svg'),
  1300: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/windyIcon.svg'),
  1400: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/windySunnyIcon.svg'),
  1500: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/sunnyIcon.svg'),
  1600: require('/Users/antonivarsson/Documents/umbrella/umbrella/src/Assets/Res/Icons/images/snowyIcon.svg')
}

const URL = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=9743140833919d56c2c140b9c34016f5&units=metric';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      date: new Date(),
      temp: 'Fetching weather <--> ',
      wheatherIcon: ''
    };
  }
  componentDidMount() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js';    
    document.getElementsByTagName('head')[0].appendChild(script);
  }


  componentWillMount(){
    this.getWeather();
    setInterval(() => {
      this.getWeather();
    },6000000);
  }

  async getWeather() {
    try {
      const response = await axios.get(URL);
      const icon = this.getWeatherIcon(response.data.weather[0].id);
      this.setState({ temp: Math.round(response.data.main.temp), wheatherIcon: icon });
    } catch (error) {
      console.error(error);
    }
  }

  getWeatherIcon(weatherID){
    
  }

  render() {
    return (
      <div>
        <div className="weathericon clearNightIcon"></div>
        <div className="weathericon lightningIcon"></div>
        <div className="weathericon rainyIcon"></div>
        <div className="weathericon lightningIcon"></div> 
        <header className='App-header'>
          <TimesContainer />
          <Clock className='clock'format={'HH:mm'} ticking={true} timezone={'Europe/Stockholm'} />
          <div className='Header__temperature__gif--group'>
         
          <img src={weatherIcons.partlyCloudy} className='App__gif--rain'/>
          <p className='temp'> {this.state.temp}°C </p>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
