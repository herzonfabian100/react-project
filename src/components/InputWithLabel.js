import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';

const InputWithLabel = ({
  id,
  name,
  handleTitleChange,
  children,
  todoTitle,
}) => {
  const inputRef = useRef();


  useEffect(() => {
    if (todoTitle === []) {

      inputRef.current.focus();
    }
  }, [todoTitle]);

  return (< >
    <label htmlFor={id} > <strong > {children} </strong> </label > & nbsp; <
      input id={id}
      type="text"
      name={name}
      ref={inputRef}
      placeholder="Add New Title"
      value={todoTitle}
      onChange={handleTitleChange} />
    <button style={{ color: "Gray" }} > Add </button>
  </>
  );
}

InputWithLabel.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string,
  handleTitleChange: PropTypes.func,
  todoTitle: PropTypes.string
};

export default InputWithLabel;