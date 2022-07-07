import React, { Component, useState } from 'react';
 
import './App.css';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Home Loan Calculator</h1>
           <p> How much do you want to buy for?</p>
           <input type="text" name='cost of home' placeholder='Enter Value between 200.000 to 20.000.000 Kr'></input>
           <p>How big is your cash bet?</p>
           <input type="text" name='cash bet' placeholder='Enter your downpayment amount'></input>
        </header>
        <p className="App-intro">{this.state.data}</p> 
      </div>
    );
  }
}

export default App;