import React, { useState } from 'react'
import { FcSupport } from "react-icons/fc";
import './EditTask.css'

const EditTask = ({ editTaskItem, setEditingStatus, id, thisList }) => {

    // Get the task item object from the task list array
    const newTaskItem = thisList.find((taskItem) => taskItem.id === id)

    const [showEditButton, setShowEditButton] = useState(true)

    // ==================================== Edit Task ====================================================

    const showInput = () => {
        setEditingStatus(true)
        setShowEditButton(false)
    }

    const acceptEdit = () => {
        console.log('accepted')

    }

    const rejectEdit = () => {
        console.log('rejected')
        setEditingStatus(false)
        setShowEditButton(true)
        console.log(showEditButton)
    }

    const editTask = (newTaskItem) => {

        // Get user input through a prompt
        let newTaskName = prompt('Edit Task')

        // If the user enters a string of 0 characters or clicks on Cancel then...
        if (newTaskName === null || newTaskName.length === 0) {

            // and alerts the user that no changes have been made
            alert("No changes made")

        } else {
            // Updates the task name with the new user input
            newTaskItem.name = newTaskName
        }

        // call the editTaskItem function in the thisList component and pass the new task name and id
        editTaskItem(newTaskItem, id)

    }


    return (

        // Edit Task button

        <div>

            {showEditButton ? <button onClick={showInput}><FcSupport /></button> : <div>
                <button id="acceptEdit" onClick={acceptEdit}>Accept</button>
                <button id="rejectEdit" onClick={rejectEdit}>Reject</button>
            </div>}

        </div>

        // <button onClick={showInput}>{showEditButton
        //     ? <FcSupport />
        //     : <div>
        //         <button id="acceptEdit" onClick={acceptEdit}>Accept</button>
        //         <button id="rejectEdit" onClick={rejectEdit}>Reject</button>
        //     </div>}
        // </button>

    )
    // () => editTask(newTaskItem)
}

export default EditTask