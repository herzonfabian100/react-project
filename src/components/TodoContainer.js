import React from 'react'
import ReactImagen from './ReactImagen.png'
function TodoContainer() {
  return (
    <div style={{ textAlign: "center" }}>
      {<img src={ReactImagen} alt="Logo" width="193" height="130" />}
      <h4>CODE DREAMS</h4>
    </div>
  )
}

export default TodoContainer;