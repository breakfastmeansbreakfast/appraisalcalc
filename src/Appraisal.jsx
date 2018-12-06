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
  purchasersCosts: 0.06,
  managementCost: 0.225,
  stabalisationPeriod: 28,
  growthRate: 0.035,
  growthPeriod: 27, // pre planning period + planning period + tender period + contruction period
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


// calculate rent roll period before stabalistion
const interimRevenue = () => {
  const interim1bed = rentTotal(oneBedArray, calcInputs.units.bedno1);
  const interim2bed = rentTotal(twoBedArray, calcInputs.units.bedno2);
  const interim3bed = rentTotal(threeBedArray, calcInputs.units.bedno3);

  const total = interim1bed.rentTotalAmount + interim2bed.rentTotalAmount + interim3bed.rentTotalAmount;
  const rentData = [total, interim1bed, interim2bed, interim3bed];
  return rentData;
};

// calculate stabalised sale
const capRevenue = () => {
  const grown1bed = oneBedArray[calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1];
  const grown2bed = twoBedArray[calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1];
  const grown3bed = threeBedArray[calcInputs.growthPeriod + calcInputs.stabalisationPeriod - 1];

  const rentRevenue =
  grown1bed * calcInputs.units.bedno1 +
  grown2bed * calcInputs.units.bedno2 +
  grown3bed * calcInputs.units.bedno3;

  const grossStabalisedRevenue = ((rentRevenue / calcInputs.yield) * 12);

  const purchasersCosts = calcInputs.purchasersCosts;
  const managementCost = calcInputs.managementCost;

  let netTotalRevenue = grossStabalisedRevenue * (1 - purchasersCosts);
  netTotalRevenue = netTotalRevenue * (1 - managementCost);
  return netTotalRevenue;
};

// const listRents = (unitInput) => {
//   const rentItems = rentArray(unitInput).map((rent) => <li key={rent.id}>{rent}</li>);
//   return (
//     <ul>{rentItems}</ul>
//   );
// };

// <p>{rentArray(calcInputs.rents.rent1bed)[0]}</p>
// <ul>
//   {listRents(calcInputs.rents.rent1bed)}
// </ul>

// eslint-disable-next-line react/prefer-stateless-function
class Appraisal extends Component {
  render() {
    const capRev = capRevenue().toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    const intRev = interimRevenue()[0].toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    const totalRev = (interimRevenue()[0] + capRevenue()).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Appraisal Calc</h1>

          <p>Rental income: {capRev}
          </p>
          <p>Capitalisation figure: {intRev}</p>
          <p>Total revenue: {totalRev}</p>
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
