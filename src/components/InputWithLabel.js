import React, { useEffect, useRef } from 'react'

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

  return (
    <>
      <label
        htmlFor={id}><strong>{children}</strong>
      </label>
      &nbsp;
      <input
        id={id}
        type="text"
        name={name}
        ref={inputRef}
        placeholder="Add new to do"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button style={{ color: "Gray" }}>Add</button>
    </>
  );
}

export default InputWithLabel;