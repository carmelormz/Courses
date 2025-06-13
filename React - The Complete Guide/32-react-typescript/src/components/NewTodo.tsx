import { PropsWithChildren, use, useRef } from 'react';

import classes from './NewTodo.module.css';
import TodosContext from '../store/todos-context';

interface Props extends PropsWithChildren {}

const NewTodo: React.FC<Props> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = use(TodosContext);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = inputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw error
      return;
    }

    // Add new To-Do...
    addTodo(enteredText);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor='text'>To-Do Text</label>
      <input type='text' id='text' ref={inputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
