import foodModel from "../models/foodModel.js";
import fs from 'fs';
import slugify from 'slugify'

// const addFood = async (req,res)=>{
//     let image_filename  = `${req.file.filename}`;
//  const food = new foodModel({
//     name:req.body.name,
//     description:req.body.description,
//     price:req.body.price,
//     category:req.body.category,
//     image:image_filename
//  })
//  try{
//       await food.save();
//       res.json({success:true,message:'Food Added'})
//  }
//  catch(error){
//       console.log(error)
//       res.json({success:false,message:'Error'})
//  }
// }

const addFood = async (req,res)=>{
    try{
        const {name,slug,description,price,category} = req.fields;
        const {image} = req.files;
        const products = new foodModel({
            ...req.fields,slug:slugify(name)
        })
        if(image)
            {
                products.image.data = fs.readFileSync(image.path)
                products.image.contentType = image.type
            }
            await products.save()
            res.json({
                success:true,
                message:"Product Created Succesfully",
                products,

            })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in adding food'
        })
    }
}

// all food list

// const listFood = async (req,res)=>{
//      try{
//          const foods  = await foodModel.find({});
//          res.json({success:true,data:foods})
//      }
//      catch(error){
//          console.log(error);
//          res.json({success:false,message:"Error"})
//      }
// }

const listFood = async (req,res)=>{
    try{
          const products = await foodModel.find({}).select("-image")
        //   if(products.image.data)
        //     {
        //         res.set("Content-type",products.image.contentType);
        //         return res.status(200).send(products.image.data)
        //     }
        res.status(200).send({
            success:true,
            message:"All Products",
            products,
        })
          
    }
    catch(error)
    {
        console.log(error)
        res.json({
            success:false,
            error:error.message,
            message:'Error in adding food'
        })
    }
}
const getphoto = async (req,res)=>{
    try{
          const product =await foodModel.findById(req.params.pid).select("image");
          if(product.image.data)
            {
                res.set("Content-type",product.image.contentType);
                return res.status(200).send(product.image.data)
            }
   
        }
          
    
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            error:error.message,
            message:'Error in printing photo'
        })
    }
}
//remove food item
const removeFood = async(req,res)=>{
try{
           const food = await foodModel.findById(req.body.id)
        //    fs.unlink(`uploads/${food.image}`,()=>{})

           await foodModel.findByIdAndDelete(req.body.id);
           res.json({success:true,message:"food removed"})
}      
catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})

}
}

export {addFood,listFood,removeFood,getphoto}