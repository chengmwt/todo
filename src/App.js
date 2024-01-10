import React from 'react'
import Header from './components/Header'
import TaskList from './components/TaskList'
import './App.css'

// To-do list for this To-do App
// Add a completed button ------------------------------------------------------------ DONE
// Add class to apply styling for completed items later ----------------------------- DONE
// Add a completed list where the completed items automatically go ----------------- DONE
// Add a clear completed list button ----------------------------------------------- DONE
// Localstorage ------------------------------------------------------------------ DONE
// Add expand and collapse ----------------------------------------------------- DONE
// Add reminder function
// Add task filter function ------------------------------------------------------- DONE
// Prevent duplicate entries -------------------------------------------------------- DONE
// Add sort ---------------------------------------------------------------------- DONE
// Redux?
// Fix Edit Task: when showInput, shows previous value
// Fix Delete Task: deleted task does not reflect on sorted or filtered list --- Fixed by applying .filter and .sort directly in the DOM instead of tracking state of multiple arrays
// Add React icons
// Styling blah blah blah
// Add delete function to all list types (task, sorted, searching)



const App = () => {

  return (

    <div className='todoApp'>

      <Header />

      <TaskList />



    </div>

  )
}

export default App