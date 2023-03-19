const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const emailSender =require('../Email')
const dishSchema=new mongoose.Schema({
    name:String,
    rate:Number,
    rating:Number,
    img:String
})

const orderSchema=new mongoose.Schema({
    cname:String,
    cemail:String,
    TableNum:String,
    order:[],
    bill:Number,
    today:{}
})


const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

orderSchema.post('save',function(){
    emailSender(this)
})
// userSchema.pre('save',async function(){
//     const hashed= await bcrypt.hash(this.password,10);
//     this.password=hashed;
// })

const dishModel=mongoose.model('Dish',dishSchema);
const orderModel=mongoose.model('order',orderSchema);
const userModel=mongoose.model('User',userSchema)

module.exports={dishModel,orderModel,userModel}