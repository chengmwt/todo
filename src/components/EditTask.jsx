import React, { useState } from 'react'
import { FcSupport } from "react-icons/fc";
import './EditTask.css'

const EditTask = ({ editTaskItem, setEditingStatus, id, thisList, editTaskName }) => {

    // Get the task item object from the task list array
    const newTaskItem = thisList.find((taskItem) => taskItem.id === id)

    // Track the state of visibility of the edit button
    const [showEditButton, setShowEditButton] = useState(true)

    // ==================================== Edit Task ====================================================

    // when user clicks on the edit button, show the input
    const showInput = () => {

        // pass the editing status to parent as true
        setEditingStatus(true)

        // hide the edit button
        setShowEditButton(false)
    }

    // when user clicks reject
    const rejectEdit = () => {

        // pass the editing status to parent as false
        setEditingStatus(false)

        // show the edit button
        setShowEditButton(true)

        // pass the unedited object to parent
        editTaskItem(newTaskItem, id)
    }

    // when user clicks accept
    const acceptEdit = () => {

        // If the user enters a string of 0 characters or clicks on Cancel then...
        if (editTaskName === null || editTaskName.length === 0) {

            // and alerts the user that no changes have been made
            alert("Task cannot be blank")

        } else {
            // Updates the task name with the new user input
            newTaskItem.name = editTaskName
        }

        // pass the edited task item object to parent
        editTaskItem(newTaskItem, id)

        // pass the editing status to parent as false
        setEditingStatus(false)

        // show the edit button
        setShowEditButton(true)
    }


    return (

        <div>

            {showEditButton ? <button onClick={showInput}><FcSupport /></button> : <div>
                <button id="acceptEdit" onClick={acceptEdit}>Accept</button>
                <button id="rejectEdit" onClick={rejectEdit}>Reject</button>
            </div>}

        </div>

    )

}

export default EditTask