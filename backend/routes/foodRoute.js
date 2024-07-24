import express from 'express'
import { addFood, foodList, removeFood } from '../controllers/foodcontroller.js'
import multer from 'multer'

const foodRouter=express.Router();



//images save in uplode folder

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,callback)=>{
        return callback(null,`${Date.now()}${file.originalname}`)

    }
})

const upload=multer({storage:storage})


foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/list',foodList)
foodRouter.post('/remove',removeFood)
export default foodRouter;