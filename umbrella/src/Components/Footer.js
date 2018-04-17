import React, { Component } from 'react';
import axios from 'axios';

import '../Assets/Stylesheets/App.css';

const URL = 'https://compliment-api.herokuapp.com/';

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      compliment: '',
      author: ' Unknown'
    };
  }

  componentWillMount(){
    this.getCompliment();
    setInterval(() => {
      this.getCompliment();
    },600000000);
  }

  async getCompliment() {
    try {
      const response = await axios.get(URL);
      this.setState({ compliment: response.data })
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <div>
        <header className='App-footer'>
        <p className='bussTimes'> { this.state.compliment } - Anton </p>
        </header>
      </div>
    );
  }
}

export default Footer;
