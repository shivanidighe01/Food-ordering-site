import { createContext, useEffect } from "react";
import { food_list } from "../assets/assets";
import { useState } from "react";
export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>
    {
        const [cartItem, setCartItem] = useState({});
        const addToCart=(itemId)=>
            {
                if(!cartItem[itemId])
                    {
                        //if item is not present then it add item to cart ie {itemId:1}
                        setCartItem((prev)=>({...prev,[itemId]:1}))
                    }
                else
                    {
                        //if item is alredy present the update the count
                        //eg.:-prev[itemId]=1
                        //      {itemId:2}  ie prev[itemId]+1
                        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
                    }
            }
        const removeFromCart=(itemId)=>
            {
                //if item is alredy present the update the count by -1 to decrease count
                        //eg.:-prev[itemId]=1
                        //      {itemId:0}  ie prev[itemId]-1
                setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            }
        
        const getTotalCartAmount=() =>
        {
            let totalAmount=0;
            for(const item in cartItem)
            {
                if(cartItem[item]>0)
                {
                    let itemInfo=food_list.find((product)=>product._id===item);
                    totalAmount+=itemInfo.price*cartItem[item];
                }
                
            }
            return totalAmount;
        }
        // useEffect(() => 
        //     {
        //         console.log(cartItem);
        //     }, [cartItem])
        


        const contextValue={
            food_list,
            cartItem,
            setCartItem,
            addToCart,
            removeFromCart,
            getTotalCartAmount

        }
        
        return (
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        )
    }

export default StoreContextProvider;