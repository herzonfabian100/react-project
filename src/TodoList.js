import React from 'react';
import TodoListItem from './TodoListItem';

// const todoList = [
//   { id: 1, title: "Read React Chapter" },
//   { id: 2, title: "Watch React Videos" },
//   { id: 3, title: "Practice React exercises " }
// ]

function TodoList(props) {

  const { todoList } = props; //destructuring

  return (
    <>
      <ul>
        {todoList.map(function (item) {
          return (<TodoListItem key={item.id} title={item.title} />)
        })}
      </ul>
    </>
  );
}

export default TodoList;