import { createStore } from 'redux';

const STORE_COUNTER_INITIAL_VALUE = {
  counter: 0,
  showCounter: true,
};

export const ACTION_TYPES = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  INCREASE: 'increase',
  TOGGLE_COUNTER: 'toggle_counter',
};

const counterReducer = (state = STORE_COUNTER_INITIAL_VALUE, action) => {
  if (action.type === ACTION_TYPES.INCREMENT) {
    return { ...state, counter: state.counter + 1 };
  }

  if (action.type === ACTION_TYPES.DECREMENT) {
    return { ...state, counter: state.counter - 1 };
  }

  if (action.type === ACTION_TYPES.INCREASE) {
    return { ...state, counter: state.counter + action.amount };
  }

  if (action.type === ACTION_TYPES.TOGGLE_COUNTER) {
    return { ...state, showCounter: !state.showCounter };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
