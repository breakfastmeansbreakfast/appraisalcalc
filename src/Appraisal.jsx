/* eslint-disable max-len */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const _ = require('lodash');

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
  managementCost: 0.225,
  stabalisationPeriod: 28,
  growthRate: 0.035,
  growthPeriod: 27, // pre planning period + planning period + tender period + contruction period
  get growth() { return Math.pow((1 + this.growthRate / 12), (this.growthPeriod)); },
};

const rentArray = (unitInput) => {
  const rentarray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= (calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1); i++) {
    let currentmonthrent = 1;
    currentmonthrent = unitInput * Math.pow((1 + calcInputs.growthRate / 12), (i));
    rentarray.push(currentmonthrent);
  }
  return rentarray;
};

// get rent arrays for 1 - 3 beds
// console.log(rentArray(calcInputs.rents.rent1bed));
// console.log(rentArray(calcInputs.rents.rent2bed));
// console.log(rentArray(calcInputs.rents.rent3bed));

// get rent array for sum to calculate. pass in rantArray(1bed / 2bed) to get grown results
const rentTotal = (unitType, unitTypeNo) => {
  const rentTotalArray = [];
  const rentroll = [];
  for (let i = calcInputs.growthPeriod; i <= (calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1); i++) {
    rentTotalArray.push(unitType[i]);
    rentroll.push(unitType[i] * unitTypeNo);
  }
  const rentTotalAmount = _.sum(rentroll);
  const rentData = {
    rentTotalArray: rentTotalArray,
    rentroll: rentroll,
    rentTotalAmount: rentTotalAmount,
  };
  return rentData;
};

// create array of full rents from month 0 onwards
const oneBedArray = rentArray(calcInputs.rents.rent1bed);
const twoBedArray = rentArray(calcInputs.rents.rent2bed);
const threeBedArray = rentArray(calcInputs.rents.rent3bed);

// create array of rents to be valued
// console.log(rentTotal(oneBedArray, calcInputs.units.bedno1));

// see https://www.linkedin.com/pulse/javascript-find-object-array-based-objects-property-rafael
const interimRevenue = () => {
  const interim1bed = rentTotal(oneBedArray, calcInputs.units.bedno1);
  const interim2bed = rentTotal(twoBedArray, calcInputs.units.bedno2);
  const interim3bed = rentTotal(threeBedArray, calcInputs.units.bedno3);

  const total = interim1bed.rentTotalAmount + interim2bed.rentTotalAmount + interim3bed.rentTotalAmount

  return (total);
};

console.log(interimRevenue());


// get inputs and calculate profit
const calc = () => {
  let grown1bed = calcInputs.rents.rent1bed * calcInputs.growth;
  let grown2bed = calcInputs.rents.rent2bed * calcInputs.growth;
  let grown3bed = calcInputs.rents.rent3bed * calcInputs.growth;

  const rentRevenue =
  grown1bed * calcInputs.units.bedno1 +
  grown2bed * calcInputs.units.bedno2 +
  grown3bed * calcInputs.units.bedno3;

  let stabalisedRevenue = // aka investment sale, not ok
  ((rentRevenue / calcInputs.yield) * 12);

  // need to get interim rev to match *next job
  const interimRevenue = ((rentRevenue)) * (calcInputs.stabalisationPeriod); // not ok

  const totalRevenue = (stabalisedRevenue + interimRevenue);
  return totalRevenue.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
};

const listRents = (unitInput) => {
  const rentItems = rentArray(unitInput).map((rent) => <li key={rent.id}>{rent}</li>);
  return (
    <ul>{rentItems}</ul>
  );
};

const listTotalRents = (unitInput) => {
  const rentItems = rentArray(unitInput).map((rent) => <li key={rent.id}>{rent}</li>);
  return (
    <ul>{rentItems}</ul>
  );
};

// eslint-disable-next-line react/prefer-stateless-function
class Appraisal extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Appraisal Calc</h1>
          <p>{rentArray(calcInputs.rents.rent1bed)[0]}</p>
          <ul>
            {listRents(calcInputs.rents.rent1bed)}
          </ul>
          <p>Rental income: {calc()}
          </p>
          <p>Capitalisation figure: </p>
          <p>Total revenue: </p>
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
