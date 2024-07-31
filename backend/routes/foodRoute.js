import express from "express"
import { addFood, getphoto, listFood, removeFood } from '../controllers/foodcontroller.js'
// import multer from "multer"
import formidable from 'express-formidable'
import fs from 'fs';

// import {v2 as cloudinary} from 'cloudinary';
// import pkg from 'cloudinary';
// const {CloudinaryStorage} = pkg;
// const cloudinary = require('cloudinary').v2;
// import { CloudinaryStorage } from 'multer'
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

    // Configuration
    // cloudinary.config({ 
    //     cloud_name: "db8sgmecd", 
    //     api_key: "161959449121495", 
    //     api_secret: "PnLI7IqUmcB14T0NZvz5QbpvL8o" // Click 'View Credentials' below to copy your API secret
    // });
    // const storage = new CloudinaryStorage({
    //     cloudinary: cloudinary,
    //     params: {
    //       folder: 'uploads',
    //       allowed_formats: ['jpg', 'png'],
    //     },
    //   });
    
    //   const upload = multer({ storage: storage });

     


const foodRouter = express.Router();


//IMAGE STORAGE ENGINE

// const storage =  multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({storage:storage});


foodRouter.post("/add",formidable(),addFood)
foodRouter.get("/list",listFood);
foodRouter.get("/foodphoto/:pid",getphoto);
foodRouter.post("/remove",removeFood);
export default foodRouter;