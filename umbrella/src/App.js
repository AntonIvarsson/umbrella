import React, { Component } from 'react';
import Header from './Components/Header.js'
import Footer from './Components/Footer.js'
import './Assets/Stylesheets/App.css';
import TimesContainer from './Components/TimesContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
