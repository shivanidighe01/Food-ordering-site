import userModel from '../models/userModel.js'

//add to cart 

const addToCart= async (req,res) =>
{
    try {
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=await userData.cartData ||{};

        // console.log(req.body.id);
        if(!cartData[req.body.id])
        {
            cartData[req.body.id]=1;
        }
        else
        {
            cartData[req.body.id]+=1;
        }

        // console.log(req.body.userId,req.body.itemId,{cartData});
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
};

//remove item

const removeFromCart =async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;

        if(cartData[req.body.id]>0)
        {
            cartData[req.body.id]-=1;
        }

       await userModel.findByIdAndUpdate(req.body.userId,{cartData});
       res.json({success:true,message:"Item removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//fetch user cart data

const getCart=async(req,res)=>
{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart};