import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://digheshivani2003:9172920669@cluster0.r9gi9q3.mongodb.net/food-ordering-site')
    .then(()=>console.log("DB connected"))
}