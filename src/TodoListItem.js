import React from 'react'

export default function TodoListItem({ todo, onRemoveTodo }) { //destructuring

  return (
    <li>
      <span>{todo}</span>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}> Remove</button>
    </li>
  );
}

