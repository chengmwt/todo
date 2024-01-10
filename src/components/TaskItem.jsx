import React, { useState } from 'react'
import EditTask from './EditTask'
import DeleteTask from './DeleteTask'
import CompleteTask from './CompleteTask'
import './TaskItem.css'

const TaskItem = ({ taskItem, updateThisList, taskList, completedList, thisList, list }) => {

    // tracks the state of whether the user is editing
    const [editing, setEditing] = useState(false)

    // tracks the value of the edit input
    const [editTaskName, setEditTaskName] = useState('')

    // =============================== Edit task item =====================================

    const setEditingStatus = (editingStatus) => {

        // sets the default value of the input to be the same as the task item name
        setEditTaskName(taskItem.name)

        // sets editing status to true
        setEditing(editingStatus)
    }

    const handleEditTaskName = (e) => {

        setEditTaskName(e.target.value)

    }

    const editTask = (newTaskItem, id) => {

        // sets the state of task name to name passed from child
        setEditTaskName(newTaskItem.name)

        // Get the index of the task item identified in the EditTask component
        const taskListIndex = thisList.findIndex((taskItem) => taskItem.id === id)

        // Update the task item name with the name sent from the EditTask component and generate a new id for the edited task
        const newTaskList = thisList.toSpliced(taskListIndex, 1, newTaskItem)

        // Update the task list with the new task list
        updateThisList(newTaskList, list)

    }



    // ================================== Delete task item ===============================
    const deleteTask = (newTaskList) => {

        // Update the task list with the new task list from DeleteTask component
        updateThisList(newTaskList, list)

    }



    // =========================== Complete task item ====================================
    const completeTask = (newTaskItem, id) => {

        // if the task item object has a property of compeleted
        if (newTaskItem.hasOwnProperty('completed')) {

            // filter it out of the task list
            const newTaskList = taskList.filter((taskItem) => taskItem.id !== id)
            updateThisList(newTaskList, 'task')

            // add it to the completed list
            const newCompletedList = ([...completedList, newTaskItem])
            updateThisList(newCompletedList, 'completed')

            // if the task item object does not have property of completed
        } else {

            // filter it out of the completed list
            const newCompletedList = completedList.filter((taskItem) => taskItem.id !== id)
            updateThisList(newCompletedList, 'completed')

            // add it to the task list
            const newTaskList = ([...taskList, newTaskItem])
            updateThisList(newTaskList, 'task')

        }
    }


    return (

        // Displays a list item with the task name, edit task button, delete task button, and complete task button
        <li id={taskItem.id} className={taskItem.completed}>
            <div className="task_item">
                <div className='task_name'>

                    {editing ? // if editing status is true
                        <div>
                            {/* show input */}
                            <input type='text' value={editTaskName} onChange={handleEditTaskName} />

                        </div> : // otherwise show the task item name
                        taskItem.name
                    }

                </div>


                <div className="task_buttons">
                    <EditTask editTaskItem={editTask} setEditingStatus={setEditingStatus} id={taskItem.id} thisList={thisList} editTaskName={editTaskName} />
                    <DeleteTask deleteTaskItem={deleteTask} id={taskItem.id} thisList={thisList} />
                    <CompleteTask completeTaskItem={completeTask} id={taskItem.id} thisList={thisList} />
                </div>
            </div>
        </li>

    )
}


export default TaskItem