import React from 'react'
import Register from './component/Register'
import Login from './component/Login'
import Todolist from './component/Todolist'
import { BrowserRouter, Route, Routes } from 'react-router'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Register /> <Login />  <Todolist /></>} />
          <Route path="login" element={<Login />} />
          <Route path="todolist" element={<Todolist />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App