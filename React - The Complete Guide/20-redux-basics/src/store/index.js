import { createStore } from 'redux';

const STORE_COUNTER_INITIAL_VALUE = {
  counter: 0,
};

export const ACTION_TYPES = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
};

const counterReducer = (state = STORE_COUNTER_INITIAL_VALUE, action) => {
  if (action.type === ACTION_TYPES.INCREMENT) {
    return { ...state, counter: state.counter + 1 };
  }

  if (action.type === ACTION_TYPES.DECREMENT) {
    return { ...state, counter: state.counter - 1 };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
