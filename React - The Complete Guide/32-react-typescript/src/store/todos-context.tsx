import { createContext, PropsWithChildren, useState } from 'react';

import Todo from '../models/todo';

interface TodosContextType {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

interface Props extends PropsWithChildren {}

const TodosContext = createContext<TodosContextType>({
  items: [],
  addTodo: (text: string) => {},
  removeTodo: (id: string) => {},
});

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      text,
    };
    setItems((currItems) => [...currItems, newTodo]);
  };

  const removeTodo = (id: string) => {
    setItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{
        items,
        addTodo,
        removeTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
