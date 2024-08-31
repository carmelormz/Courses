import { useState } from 'react';

import { Header } from './components/Header';
import { Result } from './components/Result';
import { UserInput } from './components/UserInput';

const INITIAL_INPUT_VALUES = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [userInputs, setUserInputs] = useState(INITIAL_INPUT_VALUES);

  const onInputChangeHandler = (input, value) => {
    setUserInputs((currValues) => {
      return { ...currValues, [input]: value };
    });
  };

  const inputIsValid = userInputs.duration >= 1;

  return (
    <>
      <Header />
      <UserInput inputs={userInputs} onChange={onInputChangeHandler} />
      {inputIsValid && <Result values={userInputs} />}
      {!inputIsValid && (
        <p className='center'>Please enter a duration greater than zero.</p>
      )}
    </>
  );
}

export default App;
