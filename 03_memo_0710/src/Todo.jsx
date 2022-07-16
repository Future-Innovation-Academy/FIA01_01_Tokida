import React from 'react'

const Todo = ({todo,toggleTodo}) => {

    const handleTOdoClick = () => {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.completed} readOnly onChange={handleTOdoClick}/>
            </label>
            {todo.name}
        </div>
    )
}

export default Todo