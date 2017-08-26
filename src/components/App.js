import React, { Component } from 'react';
import Header from './Header';
import Api from '../services/Api';
import '../styles/App.css';

class App extends Component {

  componentDidMount() {
   this.setTime();
  }

  setTime() {
    let hour = new Date().getHours();

    if (hour >= 19 || hour <= 6) {
      document.getElementsByTagName('body')[0].className = "theme-day";
    } else {
      document.getElementsByTagName('body')[0].className = "theme-day";
    }
  }


  render() {
    return (
      <div className="App">
        <Header></Header>
        <Api></Api>
      </div>
    );
  }
}

export default App;
