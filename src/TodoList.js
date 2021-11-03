import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
  { id: 1, title: "Read React Chapter" },
  { id: 2, title: "Watch React Videos" },
  { id: 3, title: "Practice React exercises " }
]

function TodoList(props) {
  return (
    <div>
      <ul>
        {todoList.map(item => (
          <TodoListItem key={item.id} todo={item} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;