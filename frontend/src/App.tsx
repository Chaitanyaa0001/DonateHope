import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Getstarted from './pages/Getstarted'

const App = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Getstarted/>}></Route>
    </Routes>
  )
}

export default App