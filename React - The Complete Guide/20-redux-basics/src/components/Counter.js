import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../store';

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: ACTION_TYPES.INCREMENT });
  };

  const handleDecrement = () => {
    dispatch({ type: ACTION_TYPES.DECREMENT });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
