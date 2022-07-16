import React from 'react'
import Todo from './Todo'

const TodoList = ({todos,toggleTodo}) => {
  return (
    // map関数で配列を１つずつ取得する 
    todos.map((todo) => <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo}/>)
  )
}

export default TodoList