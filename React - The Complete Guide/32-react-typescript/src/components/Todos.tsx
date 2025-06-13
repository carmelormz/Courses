import { PropsWithChildren, use } from 'react';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';
import TodosContext from '../store/todos-context';

interface Props extends PropsWithChildren {}

const Todos: React.FC<Props> = () => {
  const { items } = use(TodosContext);

  return (
    <ul className={classes.todos}>
      {items.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Todos;
