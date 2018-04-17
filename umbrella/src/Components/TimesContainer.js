import React, { Component } from 'react';
import axios from 'axios';

import '../Assets/Stylesheets/App.css';

const URL = 'https://api.resrobot.se/v2/departureBoard?key=f0d475cd-812c-44ec-b57e-ad664c890b5c&id=740021708&direction=740020755&maxJourneys=5&products=32&format=json';

const COMPLIMENT = ' https://compliment-api.herokuapp.com/'

class TimesContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      departures: [],
      compliment: ''
    };
  }
  filterBussTimes () {
    const timeNow = new Date().toLocaleTimeString('en-SE', {  hour12: false, hour: "numeric", minute: "numeric" });
    let previous = this.state.departures;
    console.log("Previous: " + previous);

    let passed = previous.map(x => x > timeNow).includes(false)

    if(passed){
      let next = previous.filter(x => x > timeNow);
      console.log("New: " + next);
      this.setState({ departures: next })
     }
  }

  componentWillMount(){
    this.getTimes();
    setInterval(() => {
      this.filterBussTimes();
    },1000)
  }

  getTimes() {
    axios.get(URL).then((response) => {
      console.log(response)
      this.setState({ departures: Array.from(new Set(response.data.Departure.map(x => x.time.substring(0, 5)))).filter(x => x !== undefined) })
    }).catch((error) => {
      this.setState({ departures:['Something went wrong', 'API service is unavalible', ':(']})
      })
  }

  render() {
    const listItems = this.state.departures.map((d) => <p className='bussTimes' key={d}>{d} </p>);
    return (
      <div>
        <p className='bussTimes'> Mot TC: </p>
        {listItems}
      </div>
    );
  }
}

export default TimesContainer;
