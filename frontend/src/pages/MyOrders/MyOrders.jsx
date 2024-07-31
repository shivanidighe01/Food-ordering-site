import React, { useContext, useState } from 'react'
import axios from 'axios';
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react';
// import assert from 'assert';
// import assets from '../../assets/assets.js'
const MyOrders = () => {

    const {url,token}=useContext(StoreContext);
    const[data,setData]=useState([]);

    const fetchOrders=async()=>{
        const response=await axios.post(url+'/api/order/userorders',{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }


    useEffect(() => {
      if(token)
      {
        fetchOrders();
      }
    
      
    }, [token])
    



  return (
    <div className='my-orders'>
        <h2>My orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                            <img src={assets.parsal_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1)
                                {
                                    return item.name+" X "+item.quantity;
                                }
                                else
                                {
                                    return item.name+" X "+item.quantity+", ";
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button>Track Order</button>
                        

                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default MyOrders