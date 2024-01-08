import React, { } from 'react'
import { FcExpand, FcCollapse } from "react-icons/fc";

const ExpandCollapse = ({ hidden, list, hideList }) => {

    const setHidden = () => {

        hidden = !hidden

        hideList(hidden, list)

    }


    return (
        <button onClick={setHidden}>{hidden ? <FcCollapse /> : <FcExpand />}</button>
    )
}

export default ExpandCollapse