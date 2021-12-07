import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'

function AddTodoForm({ onAddTodo }) {

  const [todoTitle, setTodoTitle] = useState('')

  const handleTitleChange = ({ target }) => {
    const { value } = target;
    setTodoTitle(value);
  }

  const handleAddTodo = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(todoTitle)
    onAddTodo({ id: Date.now(), title: todoTitle });
    setTodoTitle('');
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          id="title" required
          type="text"
          todoTitle={todoTitle}
          isFocused
          handleTitleChange={handleTitleChange}
          handleAddTodo={handleAddTodo}
        >
          <strong>Title:</strong>
        </InputWithLabel>
      </form>
      <hr />
    </>
  );
}

export default AddTodoForm;
