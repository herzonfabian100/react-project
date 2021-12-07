import React from 'react'

export default function TodoListItem({ todo, onRemoveTodo }) { //destructuring
  const { title } = todo;
  return (
    <li>
      <span>{title}</span>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}> Remove</button>
    </li>
  );
}

