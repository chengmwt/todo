import React, { useEffect, useState } from 'react'
import AddTask from './AddTask'
import './TaskList.css'
import TaskItem from './TaskItem'
import ExpandCollapse from './ExpandCollapse'
import SearchTask from './SearchTask'

const TaskList = () => {


    // ======================================== States ==================================
    // Tracks the array of task items
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) ?? [])

    const [completedList, setCompletedList] = useState(JSON.parse(localStorage.getItem('completedList')) ?? [])

    const [hiddenTaskList, setHiddenTaskList] = useState(JSON.parse(localStorage.getItem('hiddenTaskList')) ?? '')

    const [hiddenCompletedList, setHiddenCompletedList] = useState(JSON.parse(localStorage.getItem('hiddenCompletedList')) ?? '')

    // const [searchTaskName, setSearchTaskName] = useState('')

    const [searchFilteredList, setSearchFilteredList] = useState([])



    // =================================== Localstorage ==================================


    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }, [taskList])

    useEffect(() => {
        localStorage.setItem('completedList', JSON.stringify(completedList))
    }, [completedList])

    useEffect(() => {
        localStorage.setItem('hiddenTaskList', JSON.stringify(hiddenTaskList))
    }, [hiddenTaskList])

    useEffect(() => {
        localStorage.setItem('hiddenCompletedList', JSON.stringify(hiddenCompletedList))
    }, [hiddenCompletedList])


    // ==================================== Add Task ======================================
    const addTaskItem = (taskName) => {

        const taskItem = {
            name: taskName,
            id: Math.random(),
        }

        setTaskList([...taskList, taskItem])

    }


    // ================================== Update List ====================================

    const updateThisList = (newTaskList, list) => {

        console.log(newTaskList, list)

        if (list === 'task') {

            // Updates the taskList
            setTaskList(newTaskList)

        } else {

            // Updates the completedList
            setCompletedList(newTaskList)

        }

    }


    // ======================================== Clear completed ==========================

    const clearCompleted = () => {
        setCompletedList([])
    }


    // ============================ Expand/Collaspse list ============================

    const hideList = (hidden, list) => {


        if (list === 'task') {

            hidden ? setHiddenTaskList('hidden') : setHiddenTaskList('')

        } else {

            hidden ? setHiddenCompletedList('hidden') : setHiddenCompletedList('')
        }

    }


    // =================================== Search Task ==================================


    const searchList = (searchMatch) => {

        console.log(searchMatch)
        setSearchFilteredList(searchMatch)

    }



    return (

        <div className='task-list_wrapper'>



            <div className="list_header">
                <div className='hide_button'>
                    <ExpandCollapse hidden={hiddenTaskList} list={'task'} hideList={hideList} />
                </div>

                <h1>To-do</h1>

                <div className='search'>
                    <SearchTask taskList={taskList} searchList={searchList} />
                </div>


            </div>


            <div className="task_list">
                <AddTask addTaskItem={addTaskItem} taskList={taskList} />
                <ul className={hiddenTaskList}>
                    {searchFilteredList

                        ? (searchFilteredList.map((taskItem) => <TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                        : (taskList.map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />
                        )))
                    }

                </ul>
            </div>

            <div className="list_header">

                <div className="hide_button">
                    <ExpandCollapse className='hide_button' hidden={hiddenCompletedList} list={'completed'} hideList={hideList} />
                </div>
                <h1>Completed</h1>
                <div className="clear_all">
                    <button onClick={() => clearCompleted()}>
                        <p>Clear all completed</p>
                    </button>
                </div>

            </div>

            <div className="completed_list">

                <ul className={hiddenCompletedList}>
                    {completedList.map((taskItem) => (
                        // Maps the completedList array with individual task items

                        <TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={completedList} list={'completed'} />
                    ))}
                </ul>
            </div>

        </div >

    )

}

export default TaskList