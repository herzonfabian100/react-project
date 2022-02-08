import React from 'react'
import styles from './TodoListItem.module.css'

export default function TodoListItem({ todo, onRemoveTodo }) { //destructuring

  return (
    <li className={styles.ListItem}>
      <span>{todo}</span>
      <button
        type="button"
        className={styles.buttonRemove}
        onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>

  );
}

