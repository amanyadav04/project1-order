const express =require('express')
const {orderModel} =require('./DATABASE/dishSchema')
const {userModel}=require('./DATABASE/dishSchema')
const Router=express.Router();
const emailSender=require('./Email')
require('./DATABASE/dbConnection')

Router.post('/payment',async (req,res)=>{
    const {cname,cemail,TableNum,order,bill,today}=req.body;
  // checking if cart is empty of not
    try {
        
        if(order.length>0)
        {
            const order=new orderModel(req.body)
            await order.save();
            res.send({message:"order is placed"})
        }
        else{
            res.send({message:"please fill the cart first"})
        }
    } catch (error) {
        res.send({error:"some error happend"})
    }
})


Router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;

    try{

        const isPresent=await userModel.findOne({email:email})
        
        if(isPresent)
        {
            res.status(404).send({message:'user already registered'})
            console.log('user already registered');
        }else{
            const user=new userModel(req.body);
            await user.save();
            res.status(200).send({message:'user is registered'})
            // console.log('user registered');
        }
    }catch(err)
    {
        res.status(404).send({error:"some error occured"})
    }

})

Router.post('/login',async (req,res)=>{
    console.log('running login');
    const {email,password}=req.body;
   
    try{
        const user=await userModel.findOne({email:email})
        if(user){
              
            if(user.password==password)
            {
                console.log(user.name," logined successful");
                res.status(200).send({message:"user logined"})
            }else
            {
                console.log('wrong credentials');
                res.status(404).send({message:"wrong credentials"})
            }
        }
        else
        {
            console.log('no account for that email');
            res.status(404).send({message:"user with this emai is not found"})
        }
    }
    catch(err)
    {
           res.status(404).send({error:err})
    }


})
Router.get('/',(req,res)=>{
    res.send('Home page')
})


module.exports=Router