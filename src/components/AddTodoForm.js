import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';

const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const airtableID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const airtableTable = "Default";

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
    onAddTodo({ id: Date.now(), fields: { Title: todoTitle } });
    setTodoTitle('');

    fetch(`https://api.airtable.com/v0/${airtableID}/${airtableTable}`,
      {
        method: "POST",
        body: JSON.stringify({ fields: { Title: todoTitle } }),
        headers: {
          "Authorization": `Bearer ${airtableKey}`,
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((result) => {
        setTodoTitle(result.records)
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      }
      )

  }

  return (<>
    <form onSubmit={handleAddTodo} >
      <InputWithLabel
        id="title" required type="text"
        todoTitle={todoTitle}
        isFocused handleTitleChange={handleTitleChange}
        handleAddTodo={handleAddTodo} >
        <strong> Title: </strong>
      </InputWithLabel >
    </form>

  </>
  );
}
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};
export default AddTodoForm;