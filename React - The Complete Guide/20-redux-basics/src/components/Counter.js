import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../store';

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: ACTION_TYPES.INCREMENT });
  };

  const handleDecrement = () => {
    dispatch({ type: ACTION_TYPES.DECREMENT });
  };

  const handleIncrease = () => {
    dispatch({ type: ACTION_TYPES.INCREASE, amount: 5 });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_COUNTER });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrease}>Increase by 5</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
