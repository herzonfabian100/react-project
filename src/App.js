import React from 'react';
// Todo List
let todoList = [
  { id: 1, title: "Read React Chapter" },
  { id: 2, title: "Watch React Videos" },
  { id: 3, title: "Practice React exercises " }
]
// Application 
function App() {
  return (
    <div>
      <h1> Todo List </h1>
      <ul>
        {todoList.map((Item) => {
          return (
            <li key={Item.id}>
              {Item.title}
            </li>
          )
        })}
      </ul>
    </div >
  );
}

export default App;