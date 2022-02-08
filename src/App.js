import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from './App.module.css';
import logo from './logo.jpeg';



function Imagen() {
  // Import result is the URL of your image
  return <div>
    <img src={logo} alt="Logo" width="193" height="130" />
  </div>
}



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
    <div>
      {Imagen()}
      <div className={styles.app}>



        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <div className={styles.container}>
                <h1 className={styles.headlineTitle}
                >Todo List</h1>
                <TodoList todoList={todoList}
                  removeTodo={removeTodo}
                />
                {isLoading ? (
                  <p>Fetching Data... </p>
                ) : (
                  <AddTodoForm
                    onAddTodo={addTodo}
                  />

                )}
              </div>
            </Route>
            <Route path="/new">
              <h1 style={{ color: "Gray" }}>New Todo List</h1>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;