import React, { Component } from 'react';
import './App.css';
import firebase from '../firebase';

class App extends Component {

  handleClick = () => {
    firebase.auth().signOut();
  }
  render() {
    return (
      <div onClick={this.handleClick}>VidGuesser</div>
    );
  }
}

export default App;
