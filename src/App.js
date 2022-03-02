import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from './App.module.css';
import logo from './logo.jpeg';
import TodoContainer from './components/TodoContainer';

const initialTodoList = "reactApp.todos";

const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const airtableID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const airtableTable = "Default";
const url = `https://api.airtable.com/v0/${airtableID}/${airtableTable}`



function Imagen() {
  // Import result is the URL of your image
  return <div >
    <
      img src={logo}
      alt="Logo"
      width="193"
      height="130" />
  </div>
}



function App() {
  // const [newTodo, setNewTodo] = React.useState('');
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  // Sending a "PUT" request to the record  to update the table.
  const submitTodo = (id, newTodo) => {
    let editedTodoListItem;
    const editedTodoList = [...todoList].map((todoListItem) => {
      if (todoListItem.id === id) {
        const temp = { ...todoListItem };
        temp.fields.Title = newTodo;
        editedTodoListItem = {
          id: temp.id,
          fields: { Title: temp.fields.Title }
        }
        return temp;
      }
      return todoListItem;
    });
    console.log(url);
    fetch(`${url}`,

      {
        method: "PUT",
        body: JSON.stringify({ records: [editedTodoListItem] }),
        headers: {
          'Authorization': `Bearer ${airtableKey}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((result) => {
        setIsEditing(true);
        setTodoList(editedTodoList)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (!isEditing)
      localStorage.setItem(initialTodoList, JSON.stringify(todoList));
  }, [todoList, isEditing]);

  // Sending a "DELETE" request to the tittle to be delete on the table.
  const removeTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);

    fetch(`${url}/${id}`,
      {
        method: "delete",
        headers: {
          'Authorization': `Bearer ${airtableKey}`,
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((result) => {
        setIsDeleted(false);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    if (!isDeleted)
      localStorage.setItem(initialTodoList, JSON.stringify(todoList));
  }, [todoList, isDeleted]);

  const sortTodoList = (direction) => {
    const sortedTodoList = [...todoList].sort((objectA, objectB) => {
      const titleA = objectA.fields.Title.toUpperCase();
      const titleB = objectB.fields.Title.toUpperCase();
      const timeA = objectA.createdTime;
      const timeB = objectB.createdTime;

      if (direction === 'asc') {
        if (titleA < titleB) {
          return -1;
        } else if (titleA === titleB) {
          return 0;
        } else {
          return 1;
        }
      } else if (direction === 'desc') {
        if (titleA > titleB) {
          return -1;
        } else if (titleA === titleB) {
          return 0;
        } else {
          return 1;
        }
      } else if (direction === "time") {
        if (timeA > timeB) {
          return -1;
        } else return 1;
      }
      return 0;
    })
    console.log(sortedTodoList)
    setTodoList(sortedTodoList)
  };

  // Sending a "GET" request to fetch the existing records on our table.
  useEffect(() => {
    fetch(`${url}`, {
      headers: { "Authorization": `Bearer ${airtableKey}` }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setTodoList(result.records)
        setIsLoading(false);
        // sortTodoList(data.records)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    if (!isLoading)
      localStorage.setItem(initialTodoList, JSON.stringify(todoList));
  }, [todoList, isLoading]);



  return (<>

    <div> {Imagen()}
      <div className={styles.app} >

        <BrowserRouter>
          <Switch >
            <Route exact path="/" >
              <div className={styles.container} >
                <h1 className={styles.headlineTitle} > Todo List </h1>

                <AddTodoForm onAddTodo={addTodo} />
                <button type="button" className={styles.sortTitle}
                  onClick={() => sortTodoList('asc')}>
                  Title
                </button>

                <button type="button" className={styles.sortDownButton}
                  onClick={() => sortTodoList('asc')}>Go Up
                  {/* UP */}
                </button>

                <button type="button" className={styles.sortUpButton}
                  onClick={() => sortTodoList('desc')}>Go Down
                  {/* DOWN */}
                </button>

                <button type="button" className={styles.sortCreatedTime}
                  onClick={() => sortTodoList('time')}> Sort For Time
                  {/* Created Time */}
                </button>

                {isLoading ? (
                  <p>Loading... </p>

                ) : (
                  <TodoList todoList={todoList}
                    removeTodo={(id) => removeTodo(id)}
                    submitTodo={submitTodo}
                  />
                )}
              </div>
            </Route>
            <Route path="/new" >
              <h1 style={{ color: "Gray" }}> New Todo List </h1>
            </Route >
          </Switch>
        </BrowserRouter >
      </div>
    </div >
    <TodoContainer />
  </>
  );
}
export default App;