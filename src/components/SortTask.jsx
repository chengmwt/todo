import React, { useState } from 'react'
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { FcAlphabeticalSortingZa } from "react-icons/fc";

const SortTask = ({ taskList, updateThisList, sortList }) => {

    const [sort, setSort] = useState('Dsc')

    let sortTaskList = [...taskList]

    const sortAsc = () => {

        const sortedTaskListAsc = sortTaskList.sort(({ name: a }, { name: b }) => a - b)
        sortList(sortedTaskListAsc)
        setSort('Asc')
    }

    const sortDsc = () => {
        const sortedTaskListDsc = sortTaskList.sort(({ name: a }, { name: b }) => b - a)
        sortList(sortedTaskListDsc)
        setSort('Dsc')
    }

    return (
        <div>
            {(sort === 'Asc') ?
                < button onClick={sortDsc} > <FcAlphabeticalSortingZa /></button >
                :
                (sort === 'Dsc') ?
                    < button onClick={sortAsc} > <FcAlphabeticalSortingAz /></button >
                    :
                    < button onClick={sortAsc} > <FcAlphabeticalSortingAz /></button >}

        </div>



    )
}

export default SortTask