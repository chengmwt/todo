import React, { useEffect, useState } from 'react'
import './SearchTask.css'

const SearchTask = ({ taskList, completedList, searchList }) => {

    const [searchTaskName, setSearchTaskName] = useState('')

    const handleSearchChange = (e) => {

        setSearchTaskName(e.target.value)

    }


    useEffect(() => {

        const searchTaskMatch = taskList.filter((taskItemName) => taskItemName.name.includes(searchTaskName))

        const searchCompletedMatch = completedList.filter((taskItemName) => taskItemName.name.includes(searchTaskName))

        searchList(searchTaskMatch, searchCompletedMatch, searchTaskName)

    }, [searchTaskName])





    return (
        <input type="text" value={searchTaskName} onChange={handleSearchChange} className='searchInput' placeholder='Filter tasks' />
    )
}

export default SearchTask