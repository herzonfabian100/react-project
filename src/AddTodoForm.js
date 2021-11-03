import React, { useState } from 'react';

function AddTodoForm(props) {

  const [initText, setInitText] = useState('');

  const handleAddTodo = (e) => {
    console.log(e);
    e.preventDefault();
    props.onAddTodo(initText);
    setInitText('');
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
          placeholder="Add new todo"
          value={initText}
          onChange={e => setInitText(e.target.value)}
        />
        <button>Add</button>
        <hr />
      </div>
    </form>
  );
}

export default AddTodoForm;
