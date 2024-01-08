import React, { useEffect, useState } from 'react'
import './SearchTask.css'

const SearchTask = ({ taskList, searchList }) => {

    const [searchTaskName, setSearchTaskName] = useState('')

    const handleSearchChange = (e) => {

        setSearchTaskName(e.target.value)

    }


    useEffect(() => {

        const searchMatch = taskList.filter((taskItemName) => taskItemName.name.includes(searchTaskName))

        searchList(searchMatch, searchTaskName)

    }, [searchTaskName])





    return (
        <input type="text" value={searchTaskName} onChange={handleSearchChange} className='searchInput' placeholder='Filter tasks' />
    )
}

export default SearchTask