import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import validator from 'validator'


//login
const loginUser= async(req,res)=>
    {
        const {email,password}=req.body;
        try 
        {
            const user=await userModel.findOne({email});

            if(!user)
            {
                return res.json({success:false,message:"User does not exist"});

            }

            const isMatch=await bycrypt.compare(password,user.password);

            if(!isMatch)
            {
                res.json({success:false,message:"Invalid credentials"});

            }

            const token=createToken(user._id);
            res.json({success:true,token});
        } 
        catch (error) 
        {
            console.log(error);
            res.json({success:false,message:"Error"});
        }
    }

    //create token
    const createToken=(id)=>
    {
        return jwt.sign({id},process.env.JWT_SCREATE)
    }
//register

const registerUser=async(req,res)=>
{
    const {name,password,email}=req.body;

    try 
    {

        //if user already exists
        const exists=await userModel.findOne({email});
        if(exists)
        {
            return res.json({success:false,message:"user already exists"});

        }
        //validate email format and strong password
        if(!validator.isEmail(email))
        {
           return res.json({success:false,message:"Please enter valid email"});
        }

        if(password.length<8)
        {
            return res.json({success:false,message:"Password should be min 8 character"});
        }

        //hashing user password
        const salt=await bycrypt.genSalt(10);
        const hashedPassword=await bycrypt.hash(password,salt);


        const newUser=new userModel(
            {
                name:name,
                email:email,
                password:hashedPassword
            }
        )
        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token});
    } 
    
    catch (error) 
    {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {loginUser,registerUser};