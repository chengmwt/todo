import React, { useState } from 'react'
import { FcSupport } from "react-icons/fc";
import './EditTask.css'

const EditTask = ({ editTaskItem, setEditingStatus, id, thisList, editTaskName }) => {

    // Get the task item object from the task list array
    const newTaskItem = thisList.find((taskItem) => taskItem.id === id)

    const [showEditButton, setShowEditButton] = useState(true)

    // ==================================== Edit Task ====================================================

    const showInput = () => {
        setEditingStatus(true)
        setShowEditButton(false)
    }

    const rejectEdit = () => {
        setEditingStatus(false)
        setShowEditButton(true)
        editTaskItem(newTaskItem, id)
    }

    const acceptEdit = () => {

        // If the user enters a string of 0 characters or clicks on Cancel then...
        if (editTaskName === null || editTaskName.length === 0) {

            // and alerts the user that no changes have been made
            alert("Task cannot be blank")

        } else {
            // Updates the task name with the new user input
            newTaskItem.name = editTaskName
        }

        // call the editTaskItem function in the thisList component and pass the new task name and id
        editTaskItem(newTaskItem, id)

        setEditingStatus(false)
        setShowEditButton(true)
    }


    return (

        // Edit Task button

        <div>

            {showEditButton ? <button onClick={showInput}><FcSupport /></button> : <div>
                <button id="acceptEdit" onClick={acceptEdit}>Accept</button>
                <button id="rejectEdit" onClick={rejectEdit}>Reject</button>
            </div>}

        </div>

    )
    // () => editTask(newTaskItem)
}

export default EditTask