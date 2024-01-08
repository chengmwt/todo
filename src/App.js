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
// Add search function
// Prevent duplicate entries -------------------------------------------------------- DONE
// Add sort
// Redux?
// Add React icons
// Styling blah blah blah



const App = () => {

  return (

    <div className='todoApp'>

      <Header />

      <TaskList />



    </div>

  )
}

export default App