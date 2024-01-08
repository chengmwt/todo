import React from 'react'
import { FcCancel } from "react-icons/fc";
import './DeleteTask.css'

const DeleteTask = ({ deleteTaskItem, id, thisList }) => {

    // ================================================== Delete Task =================================================
    const deleteTask = (id) => {

        // Creates a new array omitting the item with the matching id
        const newTaskList = thisList.filter((taskItem) => taskItem.id !== id)

        // Call the deleteTaskItem function in TaskList component
        deleteTaskItem(newTaskList)

    }


    return (

        // Delete task button
        <button onClick={() => deleteTask(id)}><FcCancel /></button>

    )
}

export default DeleteTask