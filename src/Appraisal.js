import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// set inputs, need to think about setstate, work out difference between stablisation and growthperiod
const calcInputs = {
  rents: {
    rent1bed: 950,
    rent2bed: 1250,
    rent3bed: 1750,
  },
  units: {
    bedno1: 108,
    bedno2: 207,
    bedno3: 15, 
  },
  yield: 0.0425,
  //managementCost: 0.225,
  stabalisationPeriod: 28,
  growthRate: 0.035,
  growthPeriod: 27,
  get growth() {return Math.pow((1+this.growthRate/12), (this.growthPeriod))}
};

// get inputs and calculate profit
const calc = (calcInputs) => { 
  let grown1bed = calcInputs.rents.rent1bed * calcInputs.growth //ok
  let grown2bed = calcInputs.rents.rent2bed * calcInputs.growth //ok
  let grown3bed = calcInputs.rents.rent3bed * calcInputs.growth //ok
  let i
  for (i = 0; i <= calcInputs.growthPeriod; i++){
    let currentmonthrent = 1;
    currentmonthrent = calcInputs.rents.rent1bed * Math.pow((1+calcInputs.growthRate/12), (i))
    console.log(currentmonthrent)
  }

  
  let rentRevenue = //ok
  grown1bed * calcInputs.units.bedno1 +
  grown2bed * calcInputs.units.bedno2 +
  grown3bed * calcInputs.units.bedno3;

  //let managementCut = 1 - calcInputs.managementCost;



  let stabalisedRevenue = // aka investment sale, not ok
  ((rentRevenue / calcInputs.yield) * 12);
  //console.log(stabalisedRevenue)

// need to get interim rev to match *next job
  let interimRevenue = ((rentRevenue)) * (calcInputs.stabalisationPeriod) //aka rental income, not ok
  console.log(interimRevenue)

  let totalRevenue = Math.round(stabalisedRevenue + interimRevenue);
  return totalRevenue.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'});
}

class Appraisal extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Appraisal Calc</h1>
          <p>           
          Profit <br /> <br />
          {calc(calcInputs)} <br />
          </p>
          <a
            className="App-link"
            href="https://github.com/breakfastmeansbreakfast"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tom Dunn
          </a>
        </header>
      </div>
    );
  }
}

export default Appraisal;
