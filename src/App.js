import { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


// Application 
function App() {
  const [newTodo, setNewTodo] = useState('');

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={setNewTodo} newTodo={newTodo} />
      <p>{newTodo}</p>
      <TodoList />

    </div>
  );
}

export default App;