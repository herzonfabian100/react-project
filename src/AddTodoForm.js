import React, { useState } from 'react';

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
    <form onSubmit={handleAddTodo}>
      <div>
        <label
          htmlFor="todoTitle"><strong>Title: </strong>
        </label>
        <input
          type="text"
          name="title" required
          id="todoTitle"
          placeholder="Add a new TODO here"
          value={todoTitle}
          onChange={handleTitleChange}
        />
        <button>Add</button>
        <hr />
      </div>
    </form>
  );
}

export default AddTodoForm;
