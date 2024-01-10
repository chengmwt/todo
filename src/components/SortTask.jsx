import React, { useState } from 'react'
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { FcAlphabeticalSortingZa } from "react-icons/fc";

const SortTask = ({ list, sortOrder }) => {

    // Tracks state of sorting
    const [sortBy, setSortBy] = useState('')


    // if sorted by ascending
    const sortAsc = () => {

        // set sort state as ascending
        setSortBy('Asc')
        // pass sort order and applicable list to parent
        sortOrder('Asc', list)
    }

    const sortDsc = () => {

        // set sort state as descending
        setSortBy('Dsc')
        // pass sort order and applicable list to parent
        sortOrder('Dsc', list)

    }

    return (

        <div>

            {(sortBy === 'Asc') ?
                < button onClick={sortDsc} > <FcAlphabeticalSortingAz /></button >
                :
                (sortBy === 'Dsc') ?
                    < button onClick={sortAsc} > <FcAlphabeticalSortingZa /></button >
                    :
                    < button onClick={sortAsc} > <FcAlphabeticalSortingAz /></button >}

        </div>

    )
}

export default SortTask


