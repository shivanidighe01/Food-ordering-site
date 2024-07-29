import { response } from 'express';
import jwt from 'jsonwebtoken'

const authMiddleware=async(req,res,next)=>
{
    const token = req.headers['authorization'] || req.headers['token'];
    if(!token)
    {
        return res.json({success:false,message:"Not Authorized login again"});

    }
    try {
        const decode_token=jwt.verify(token,process.env.JWT_SCREATE);
        req.body.userId=decode_token.id;
        next();
    
    } catch (error) {
        console.Console(error);
        res.json({success:false,message:"Error"});
    }
}

export default authMiddleware;