import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
const Login = ({setShowLoginPopup}) => {
    const [currState,setCurrState]=useState('Sign up')
  return (
    <div className="login-popup">
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLoginPopup(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currState==='Login' ?<></>:<input type="text" placeholder='Your Name' required />}
                
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='password' required/>
            </div>
            <button>{currState==='Sign up' ? 'Create Account':'Login'}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to terms of use and privacy policy.</p>
            </div>
            {
                currState==='Login'
                ?<p>Create new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
                :<p>Already have an account <span onClick={()=>setCurrState('Login')}>Login</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default Login