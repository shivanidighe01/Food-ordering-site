import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
// import LoginPopup from './components/LoginPopup/LoginPopup'
import Login from './components/Login/Login'
import MyOrders from './pages/MyOrders/MyOrders'
const App = () => {

  const [showLoginPopup,setShowLoginPopup]=useState(false);
  return (
    <>
    {
      showLoginPopup ? <Login setShowLoginPopup={setShowLoginPopup}></Login>:<></>
    }
    <div className='app'>
      <Navbar setShowLoginPopup={setShowLoginPopup}></Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/myorders' element={<MyOrders></MyOrders>} />
      </Routes>
     
    </div>
    <Footer></Footer>
    </>
  )
}

export default App