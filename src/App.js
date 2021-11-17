import { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


// Application 
function App() {
  //const [newTodo, setNewTodo] = useState('');
  const addTodo = (newTodo) => {

    setTodoList([...todoList, newTodo])

  };
  const [todoList, setTodoList] = useState([])
  console.log(todoList)

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;