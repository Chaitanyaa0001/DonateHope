import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Getstarted from './pages/Getstarted'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Getstarted/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>

    </Routes>
  )
}

export default App