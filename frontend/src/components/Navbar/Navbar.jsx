import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { useState } from 'react'
const Navbar = ({setShowLoginPopup}) => {

  const [menu, setMenu] = useState("Home")

  return (
   <>
   <div className='navbar'>
    <img className='logo' src={assets.logo} alt="logo" />
   
     <ul className="nav-menu">
      <li onClick={()=>setMenu("Home")} className={menu==='Home'?"active":""}>Home</li>
      <li onClick={()=>setMenu("Menu")} className={menu==='Menu'?"active":""}>Menu</li>
      <li onClick={()=>setMenu("Mobile-App")} className={menu==='Mobile-App'?"active":""}>Mobile-App</li>
      <li onClick={()=>setMenu("Contact Us")} className={menu==='Contact Us'?"active":""}>Contact Us</li>
     </ul>
    
    <div className="nav-right">
      <img src={assets.search_icon} alt="search" />
      <div className="search-icon">
        <img src={assets.basket_icon} alt="basket" />
        <div className="dot"></div>
      </div>
      <button onClick={()=>setShowLoginPopup(true)}>Sign in</button>
    </div>
   
   </div>
   </>
  )
}

export default Navbar