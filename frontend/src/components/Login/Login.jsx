import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Login = ({setShowLoginPopup}) => {
    const {url,setToken}=useContext(StoreContext)
    const [currState,setCurrState]=useState('Sign up')
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setData(data=>({...data,[name]:value}))
    }
    // useEffect(() => {
    // console.log(data);  
    // }, [data])
    const onLogin=async (e)=>
    {
        e.preventDefault();
        let newUrl=url;
        if(currState=='Login')
        {
            newUrl+='/api/user/login'
        }
        else
        {
            newUrl+='/api/user/register'
        }
        const response=await axios.post(newUrl,data);
        if(response.data.success)
        {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLoginPopup(false)
        }
        else
        {
            alert(response.data.message);
        }
    }

  return (
    <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLoginPopup(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currState==='Login' ?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                
                <input name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password}  type="password" placeholder='password' required/>
            </div>
            <button type='submit'>{currState==='Sign up' ? 'Create Account':'Login'}</button>
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