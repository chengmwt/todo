import React, { useEffect, useState } from 'react'
import AddTask from './AddTask'
import './TaskList.css'
import TaskItem from './TaskItem'
import ExpandCollapse from './ExpandCollapse'
import SearchTask from './SearchTask'
import SortTask from './SortTask'

const TaskList = () => {


    // ======================================== States ==================================

    // Tracks the array of tasks
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) ?? [])

    // Tracks array of completed tasks
    const [completedList, setCompletedList] = useState(JSON.parse(localStorage.getItem('completedList')) ?? [])

    // Tracks state of expanded/collapsed task list
    const [hiddenTaskList, setHiddenTaskList] = useState(JSON.parse(localStorage.getItem('hiddenTaskList')) ?? '')

    // Tracks state of expanded/collapsed completed task list
    const [hiddenCompletedList, setHiddenCompletedList] = useState(JSON.parse(localStorage.getItem('hiddenCompletedList')) ?? '')

    // Tracks state of search input to display filtered list
    const [searching, setSearching] = useState(false)

    // Tracks the state of the search input
    const [searchTaskName, setSearchTaskName] = useState('')

    // Tracks the sorting order of the task list
    const [taskListSortBy, setTaskListSortBy] = useState('')

    // Tracks the sorting order of the completed list
    const [completedListSortBy, setCompletedListSortBy] = useState('')


    // =================================== Localstorage ==================================

    // Stores the tasklist
    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }, [taskList])

    // Stores the completed list
    useEffect(() => {
        localStorage.setItem('completedList', JSON.stringify(completedList))
    }, [completedList])

    // Stores the state of expand/collapse of the task list
    useEffect(() => {
        localStorage.setItem('hiddenTaskList', JSON.stringify(hiddenTaskList))
    }, [hiddenTaskList])

    // Stores the state of expand/collapse of the completed list
    useEffect(() => {
        localStorage.setItem('hiddenCompletedList', JSON.stringify(hiddenCompletedList))
    }, [hiddenCompletedList])


    // ==================================== Add Task ======================================

    const addTaskItem = (taskName) => {

        // Takes the task name entered by the user and assigns it a random number for an id
        const taskItem = {
            name: taskName,
            id: Math.random(),
        }

        // Tacks on the task item to the existing task list array
        setTaskList([...taskList, taskItem])

    }


    // ================================== Update List ====================================

    const updateThisList = (newTaskList, list) => {

        // if list is task
        if (list === 'task') {

            // Updates the taskList
            setTaskList(newTaskList)

            // if list is completed
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


    const isSearching = (searching, searchTaskName) => {

        // sets the state of whether user is searching
        setSearching(searching)

        // sets the value of search to user's input
        setSearchTaskName(searchTaskName)

    }


    // ====================================== Sort Tasks ================================

    const sortOrder = (order, list) => {

        if (list === 'task') {
            setTaskListSortBy(order)
        } else {
            setCompletedListSortBy(order)
        }
    }




    return (

        <div className='task-list_wrapper'>

            <div className="list_header">
                <div className='hide_button buttons'>

                    <ExpandCollapse hidden={hiddenTaskList} list={'task'} hideList={hideList} />
                    <SortTask list={'task'} sortOrder={sortOrder} />

                </div>

                <h1>To-do</h1>

                <div className='search'>
                    <SearchTask isSearching={isSearching} />
                </div>

            </div>


            <div className="task_list">
                <AddTask addTaskItem={addTaskItem} taskList={taskList} />
                <ul className={hiddenTaskList}>


                    {searching ? // if searching is true
                        // Then filter the tasks that include the searchTaskName
                        taskList.filter((taskItemName) => taskItemName.name.includes(searchTaskName)).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                        : (taskListSortBy === 'Asc') ? // if task list sorted ascending

                            taskList.sort(({ name: a }, { name: b }) => a - b).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                            : (taskListSortBy === 'Dsc') ? // if task list sorted descending

                                taskList.sort(({ name: a }, { name: b }) => b - a).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                                : // if no sort and no filter
                                (taskList.map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />
                                )))
                    }
                </ul>
            </div>


            <div className="list_header">

                <div className="hide_button buttons">
                    <ExpandCollapse className='hide_button' hidden={hiddenCompletedList} list={'completed'} hideList={hideList} />
                    <SortTask list={'completed'} sortOrder={sortOrder} />
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

                    {searching ?
                        completedList.filter((taskItemName) => taskItemName.name.includes(searchTaskName)).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={completedList} list={'completed'} />))

                        : (completedListSortBy === 'Asc') ?

                            completedList.sort(({ name: a }, { name: b }) => a - b).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={completedList} list={'completed'} />))

                            : (completedListSortBy === 'Dsc') ?

                                completedList.sort(({ name: a }, { name: b }) => b - a).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={completedList} list={'completed'} />))

                                :
                                (completedList.map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={completedList} list={'completed'} />
                                )))
                    }

                </ul>
            </div>

        </div >

    )

}

export default TaskList