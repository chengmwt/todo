import React, { useState } from 'react'
import EditTask from './EditTask'
import DeleteTask from './DeleteTask'
import CompleteTask from './CompleteTask'
import './TaskItem.css'

const TaskItem = ({ taskItem, updateThisList, taskList, completedList, thisList, list }) => {

    const [editing, setEditing] = useState(false)
    const [editTaskName, setEditTaskName] = useState(taskItem.name)

    // ================================================ Edit task item ====================================================

    const setEditingStatus = (editingStatus) => {
        setEditing(editingStatus)
    }

    const handleEditTaskName = (e) => {
        setEditTaskName(e.target.value)
    }

    const editTask = (newTaskItem, id) => {

        setEditTaskName(newTaskItem.name)

        // Get the index of the task item identified in the EditTask component
        const taskListIndex = thisList.findIndex((taskItem) => taskItem.id === id)

        // Update the task item name with the name sent from the EditTask component and generate a new id for the edited task
        const newTaskList = thisList.toSpliced(taskListIndex, 1, newTaskItem)

        // Update the task list with the new task list
        updateThisList(newTaskList, list)

    }



    // ================================================= Delete task item =================================================
    const deleteTask = (newTaskList) => {

        // Update the task list with the new task list from DeleteTask component
        updateThisList(newTaskList, list)

    }



    // ================================================== Complete task item =============================================
    const completeTask = (newTaskItem, id) => {

        console.log(newTaskItem)

        if (newTaskItem.hasOwnProperty('completed')) {

            const newTaskList = taskList.filter((taskItem) => taskItem.id !== id)
            updateThisList(newTaskList, 'task')

            const newCompletedList = ([...completedList, newTaskItem])
            updateThisList(newCompletedList, 'completed')

            console.log(thisList)
            console.log('completed')

        } else {

            const newCompletedList = completedList.filter((taskItem) => taskItem.id !== id)
            updateThisList(newCompletedList, 'completed')

            const newTaskList = ([...taskList, newTaskItem])
            updateThisList(newTaskList, 'task')

        }
    }


    return (

        // Displays a list item with the task name, edit task button, delete task button, and complete task button
        <li id={taskItem.id} className={taskItem.completed}>
            <div className="task_item">
                <div className='task_name'>

                    {editing
                        ? <div>
                            <input type='text' value={editTaskName} onChange={handleEditTaskName} />

                        </div>
                        : taskItem.name
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