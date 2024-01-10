import React, { useEffect, useState } from 'react'
import './SearchTask.css'

const SearchTask = ({ isSearching }) => {

    // set state for user input
    const [searchTaskName, setSearchTaskName] = useState('')

    // handles user input
    const handleSearchChange = (e) => {

        setSearchTaskName(e.target.value)

    }


    useEffect(() => {

        // if length of input > 0
        if (searchTaskName.length !== 0) {

            // set searching = true and send searchTaskName to parent
            isSearching(true, searchTaskName)

        } else {

            // set searching = false
            isSearching(false)

        }

        // every time that the input is changed
    }, [searchTaskName])





    return (
        <input type="text" value={searchTaskName} onChange={handleSearchChange} className='searchInput' placeholder='Filter tasks' />
    )
}

export default SearchTask