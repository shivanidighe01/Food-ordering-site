import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import { placeOrder } from './controllers/orderController.js'
import EventEmitter from 'events'


// const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(20); // Set a higher limit if necessary
//app config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api end point =>routes
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'))
app.get("/",(req,res)=>{
    res.send("api working")
})
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter);
app.use('/api/order',placeOrder);


//run express server
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

//mongodb+srv://digheshivani2003:9172920669@cluster0.r9gi9q3.mongodb.net/?