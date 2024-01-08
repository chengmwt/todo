import React from 'react'
import { FcCheckmark } from "react-icons/fc";
import './CompleteTask.css'

const CompleteTask = ({ completeTaskItem, id, thisList }) => {


    // Get the task item object from the current list array
    const newTaskItem = thisList.find((taskItem) => taskItem.id === id)

    //  ============================================== Complete Task ===================================================
    const completeTask = () => {

        // If task item object has property of completed
        if (newTaskItem.hasOwnProperty('completed')) {

            // delete it
            delete newTaskItem.completed

        } else {

            // add proptery of completed = 'true'
            newTaskItem.completed = 'true'
        }

        // Call the completeTaskItem function to pass back the new object and id
        completeTaskItem(newTaskItem, id)

    }


    return (

        // Complete Task button
        <button onClick={() => completeTask()}><FcCheckmark /></button>

    )

}

export default CompleteTask