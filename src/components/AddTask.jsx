import React, { useState } from 'react'
import './AddTask.css'
import { IoMdAdd } from "react-icons/io";

const AddTask = ({ addTaskItem, taskList }) => {

    const [taskName, setTaskName] = useState('') // Tracks the state of the input field to allow user input



    const handleChange = (e) => { // Handler for user input into the input field

        setTaskName(e.target.value) // This continuously sets the state of the TaskName as the user types

    }

    // ===================================== Add task ========================================

    const addTask = (e) => {

        // Prevents the default action of refreshing the page
        e.preventDefault()

        // Maps a new array using the names in the taskList objects for duplicate comparison
        const taskListName = taskList.map((taskItem) => (taskItem.name))

        // If the user enters a string of 0 then
        if (taskName.length === 0) {

            // Ask user to enter a task name
            alert("Please add a task name")

            // If the user enters a task with the same name as an existing task
        } else if (taskListName.includes(taskName)) {

            // Alert task already exists
            alert("Task already exists")

        }
        else {

            // Call the function and pass the task name back to App
            addTaskItem(taskName)

            // Clear the input field after submission
            setTaskName('')

        }

    }


    return (

        <div className='add_task'>

            <form className='inputTask'>
                <input type="text" placeholder='Add a new task' value={taskName} onChange={handleChange} />

                <button onClick={addTask}><IoMdAdd /></button>
            </form>

        </div>
    )
}

export default AddTask