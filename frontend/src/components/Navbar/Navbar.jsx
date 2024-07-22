import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom';

import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLoginPopup}) => {

  const [menu, setMenu] = useState("Home")
  const {getTotalCartAmount}=useContext(StoreContext)
  return (
   <>
   <div className='navbar'>
    <Link to='/'><img className='logo' src={assets.logo} alt="logo" /></Link>
   
     <ul className="nav-menu">
      <li onClick={()=>setMenu("Home")} className={menu==='Home'?"active":""}>Home</li>
      <li onClick={()=>setMenu("Menu")} className={menu==='Menu'?"active":""}>Menu</li>
      <li onClick={()=>setMenu("Mobile-App")} className={menu==='Mobile-App'?"active":""}>Mobile-App</li>
      <li onClick={()=>setMenu("Contact Us")} className={menu==='Contact Us'?"active":""}>Contact Us</li>
     </ul>
    
    <div className="nav-right">
      <img src={assets.search_icon} alt="search" />
      <div className="search-icon">
        <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      <button onClick={()=>setShowLoginPopup(true)}>Sign in</button>
    </div>
   
   </div>
   </>
  )
}

export default Navbar