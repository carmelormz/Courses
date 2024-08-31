import React from 'react';
import investmentCalculatorImg from '../assets/investment-calculator-logo.png';

export const Header = () => {
  return (
    <header id='header'>
      <img src={investmentCalculatorImg} />
      <h1>Investment Calculator</h1>
    </header>
  );
};
