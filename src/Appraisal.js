import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const calcInputs = {
  rents: {
    rent1bed: 900,
    rent2bed: 1250,
    rent3bed: 1750,
  },
  units: {
    bedno1: 60,
    bedno2: 30,
    bedno3: 7, 
  },
  yield: 0.05,
};

const calc = (calcInputs) => {
  let rentRevenue = 
  calcInputs.rents.rent1bed * calcInputs.units.bedno1 +
  calcInputs.rents.rent2bed * calcInputs.units.bedno2 +
  calcInputs.rents.rent3bed * calcInputs.units.bedno3;
  let capitalisedRevenue = 
  (rentRevenue / calcInputs.yield) * 12
  let profit = Math.round(capitalisedRevenue)
  return profit.toLocaleString();
}

class Appraisal extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Appraisal page. {calc(calcInputs)}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Appraisal;
