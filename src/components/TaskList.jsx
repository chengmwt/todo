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

    // Tracks state of search input to change list to filtered list
    const [searching, setSearching] = useState(false)

    // Tracks the filtered task list
    const [searchTaskFilteredList, setSearchTaskFilteredList] = useState([])

    // Tracks the filtered completed task list
    const [searchCompletedFilteredList, setSearchCompletedFilteredList] = useState([])

    // Tracks state of sorting to change list to sorted list
    const [sorting, setSorting] = useState(false)

    // Tracks sorted list
    const [sortedList, setSortedList] = useState([])

    const [searchTaskName, setSearchTaskName] = useState('')

    const [taskListSortBy, setTaskListSortBy] = useState('')

    const [completedListSortBy, setCompletedListSortBy] = useState('')


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

    const updateThisList = (newTaskList, list, mutated) => {


        console.log(newTaskList, list)

        if (list === 'task') {

            // Updates the taskList
            setSorting(false)
            setTaskList(newTaskList)

            console.log('tasklist')

        } else {

            // Updates the completedList
            setCompletedList(newTaskList)

        }

    }


    useEffect(() => {
        const force = searchTaskFilteredList
        const force2 = sortedList
        setSearchTaskFilteredList([...force])
        setSortedList([...force2])
        console.log(taskList)
        console.log(searchTaskFilteredList)
        console.log(sortedList)
    }, [taskList])


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


    const handleSearchChange = (e) => {

        setSearchTaskName(e.target.value)

    }

    useEffect(() => {

        if (searchTaskName.length !== 0) {

            setSearching(true)
            taskList.filter((taskItemName) => taskItemName.name.includes(searchTaskName))

            completedList.filter((taskItemName) => taskItemName.name.includes(searchTaskName))


        } else {
            setSearching(false)
        }

    }, [searchTaskName])



    // ====================================== Sort Tasks ================================

    const setSortOrder = (list) => {

        if (list === 'task') {
            taskListSortBy === 'Dsc' ? setTaskListSortBy('Asc') : taskListSortBy === 'Asc' ? setTaskListSortBy('Dsc') : setTaskListSortBy('Asc')
        } else {
            completedListSortBy === 'Dsc' ? setCompletedListSortBy('Asc') : completedListSortBy === 'Asc' ? setCompletedListSortBy('Dsc') : setCompletedListSortBy('Asc')
        }
    }




    return (

        <div className='task-list_wrapper'>

            <div className="list_header">
                <div className='hide_button buttons'>
                    <ExpandCollapse hidden={hiddenTaskList} list={'task'} hideList={hideList} />

                    <button onClick={() => setSortOrder('task')}>Sort By</button>
                </div>

                <h1>To-do</h1>

                <div className='search'>

                    <input type="text" value={searchTaskName} onChange={handleSearchChange} />
                </div>


            </div>


            <div className="task_list">
                <AddTask addTaskItem={addTaskItem} taskList={taskList} />
                <ul className={hiddenTaskList}>

                    {searching ?
                        taskList.filter((taskItemName) => taskItemName.name.includes(searchTaskName)).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                        : (taskListSortBy === 'Asc') ?

                            taskList.sort(({ name: a }, { name: b }) => a - b).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                            : (taskListSortBy === 'Dsc') ?

                                taskList.sort(({ name: a }, { name: b }) => b - a).map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />))

                                :
                                (taskList.map((taskItem) => (<TaskItem taskItem={taskItem} updateThisList={updateThisList} taskList={taskList} completedList={completedList} thisList={taskList} list={'task'} />
                                )))
                    }

                </ul>
            </div>

            <div className="list_header">

                <div className="hide_button">
                    <ExpandCollapse className='hide_button' hidden={hiddenCompletedList} list={'completed'} hideList={hideList} />
                    <button onClick={() => setSortOrder('completed')}>Sort By</button>
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