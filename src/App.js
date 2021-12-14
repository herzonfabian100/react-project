import { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';




function App() {
  // const [newTodo, setNewTodo] = React.useState('');
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList')) || []
          }
        })
      }, 2000);
    })
      .then(({ data }) => {
        setTodoList(data.todoList);
        setIsLoading(false);
      });
  }, []);

  // const [todoList, setTodoList] = useState(
  //   JSON.parse(localStorage.getItem('savedTodoList') || '[]')
  // );

  useEffect(() => {
    if (!isLoading)
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  };

  const removeTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {/* <p>
        New todo: {newTodo}  
      </p> */}
      {isLoading ? (
        <p>Loading… </p>
      ) : (
        <TodoList todoList={todoList}
          removeTodo={removeTodo}
        />
      )}
    </>
  );
}

export default App;