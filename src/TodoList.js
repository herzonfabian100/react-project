import React from 'react';
import TodoListItem from './TodoListItem';

// const todoList = [
//   { id: 1, title: "Read React Chapter" },
//   { id: 2, title: "Watch React Videos" },
//   { id: 3, title: "Practice React exercises " }
// ]

function TodoList({ todoList, removeTodo }) {

  return (
    <>
      <ul>
        {todoList.map(function (item) {
          return (<TodoListItem key={item.id} todo={item}
            onRemoveTodo={removeTodo} />)
        })}
      </ul>
    </>
  );
}

export default TodoList;