import { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Counter.module.css';
import { ACTION_TYPES } from '../store';

class Counter extends Component {
  handleIncrement() {
    this.props.increment();
  }

  handleDecrement() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.handleIncrement.bind(this)}>Increment</button>
          <button onClick={this.handleDecrement.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler.bind(this)}>
          Toggle Counter
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: ACTION_TYPES.INCREMENT }),
    decrement: () => dispatch({ type: ACTION_TYPES.DECREMENT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
