import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

// const todoList = [
//   { id: 1, title: "Read React Chapter" },
//   { id: 2, title: "Watch React Videos" },
//   { id: 3, title: "Practice React exercises " }
// ]

function TodoList({ todoList, removeTodo, submitTodo }) {

  return (<>
    <ul>
      {todoList.map(record => (
        <TodoListItem
          key={record.id}
          id={record.id}
          todo={record.fields.Title}
          submitTodo={submitTodo}
          onRemoveTodo={(id) => removeTodo(id)}
        />
      ))}
    </ul>

  </>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  removeTodo: PropTypes.func
};
export default TodoList;