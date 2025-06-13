import { use } from 'react';
import Todo from '../models/todo';
import classes from './TodoItem.module.css';
import TodosContext from '../store/todos-context';

interface Props {
  item: Todo;
}

const TodoItem: React.FC<Props> = ({ item }) => {
  const { removeTodo } = use(TodosContext);

  const clickHandler = (event: React.MouseEvent) => {
    removeTodo(item.id);
  };

  return (
    <li className={classes.item} onClick={clickHandler}>
      {item.text}
    </li>
  );
};

export default TodoItem;
