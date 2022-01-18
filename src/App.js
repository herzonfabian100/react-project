import { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';




function App() {
  // const [newTodo, setNewTodo] = React.useState('');
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.records);
        setTodoList(result.records);
        setIsLoading(false);

      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


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