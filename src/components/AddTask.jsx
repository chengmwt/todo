import React, { useState } from 'react'
import './AddTask.css'
import { IoMdAdd } from "react-icons/io";

const AddTask = ({ addTaskItem }) => {

    const [taskName, setTaskName] = useState('') // Tracks the state of the input field to allow user input



    const handleChange = (e) => { // Handler for user input into the input field

        setTaskName(e.target.value) // This continuously sets the state of the TaskName as the user types

    }


    const addTask = (e) => { // Add task


        e.preventDefault() // Prevents the default action of refreshing the page


        if (taskName.length === 0) { // If the user enters a string of 0 then

            alert("Please add a task name") // Ask user to enter a task name

        } else {

            addTaskItem(taskName) // Call the function and pass the task name back to App


            setTaskName('') // Clear the input field after submission

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