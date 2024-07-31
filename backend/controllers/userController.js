import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import validator from 'validator';
import nodemailer from 'nodemailer'




    // const nodeMailer = require('nodemailer')

let transportmail = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'parthrajput031@gmail.com',
        pass:'sbwfrwgpncmndvda'
    }
})

const Sendmail=  (email)=>{
let mailContent = {
    from:"parthrajput031@gmail.com",
    to: `${email}`,
    subject:'Welcome... Give us chance to end your craving!!!',
    text:"Order Food From our Restaurent let's wish for a delightful journey with you.Get Different items from our shop at your door step"
}

transportmail.sendMail(mailContent,function(err,val){
    if(err){
        console.log(err)
    }else{
        console.log(val.response,"sent Mail...")
    }
})
}

//login user
const loginUser = async (req,res)=>{
    const {email,password}=req.body
    try{
        const user = await userModel.findOne({email});
        if(!user)
           {
               return res.json({success:false,message:"User Doesn't exist"})
           }
   
           const isMatch = await bcrypt.compare(password,user.password)
           if(!isMatch)
               {
                   return res.json({success:false,message:"Invalid credentials"})
               }
               const token = createToken(user._id)

   Sendmail(email)
    res.json({success:true,token})
    }
     
 catch(error)
 {
    console.log(error)
    res.json({success:false,message:"Error"})
 }
        }


const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res)=>{
    const{name,password,email}=req.body;
    try{
       const exists = await userModel.findOne({email});
       if(exists)
       {
        return res.json({success:false,message:"user already exists"})
       }
       if(!validator.isEmail(email))
{
   return res.json({success:false,message:"please enter a valid email"})
}  
if(password.length<8)
   {
       return res.json({success:false,message:"Please enter a strong password"})
   }

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password,salt);
 const newUser = new userModel({
   name:name,
   email:email,
   password:hashedPassword,
 })
 
 const user = await newUser.save()
const token = createToken(user._id) 
 res.json({success:true,token})
}
    catch(error){
console.log(error)
res.json({success:false,message:"error"})
    }
}

export  {loginUser,registerUser}