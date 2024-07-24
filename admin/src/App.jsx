import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route } from 'react-router-dom'
// import List from './pages/List/List'
// import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <hr />
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/add' element={<Add></Add>}></Route>
          <Route path='/list' element={<List></List>}></Route>
          <Route path='/orders' element={<Orders></Orders>}></Route>  
        </Routes>
      </div>
    </div>
  )
}

export default App