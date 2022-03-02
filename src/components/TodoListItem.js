import React, { useState } from 'react';
import styles from './TodoListItem.module.css'
import PropTypes from 'prop-types';

export default function TodoListItem({ todo, onRemoveTodo, id, name, submitTodo }) { //destructuring

  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  function handleChange(e) {
    e.preventDefault();
    setNewTodo(e.target.value);
  }

  function handleChangeTwo(e) {
    e.preventDefault();
  }

  const editingTemplate = (
    <form onSubmit={
      (e) => handleChangeTwo({ e, id, newTodo })} >
      <div>
        <label className={styles.renameTodo}
          htmlFor={id} > Rename Title: {name} </label>
        <input id={id}
          type="text"
          value={newTodo}
          onChange={(id) => handleChange(id)} />
      </div>
      <div>
        <button type="button"
          className={styles.cancelButton}
          onClick={
            () => setIsEditing(false)}>
          { /* Cancel */}
          <span className="visually-hidden" > {name} </span>
          Cancel </button>
        <button type="button"
          className={styles.saveButton}
          onClick={
            () => submitTodo(id, newTodo)} > { /* Save */}
          <span className="visually-hidden" > {name} </span>
          Save </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div>
      <label className="todo-label" htmlFor={id} > {name} </label>
    </div>
  );


  return (<>
    <li className={styles.editItem} > {isEditing ? editingTemplate : viewTemplate}
    </li>
    <li className={styles.ListItem}>
      <span > {todo} </span>
      <div className={styles.buttonGroup}>
        <button type="button"
          className={styles.buttonEdit}
          onClick={
            () => setIsEditing(true)}> Edit
          { /* Edit */}
          <span> {name} </span>
        </button>
        <button type="button"
          className={styles.buttonRemove}
          onClick={
            () => onRemoveTodo(id)}> Remove{ /* Remove */}
        </button>
      </div>
    </li>
  </>
  );
}


TodoListItem.propTypes = {
  todo: PropTypes.string,
  onRemoveTodo: PropTypes.func
};