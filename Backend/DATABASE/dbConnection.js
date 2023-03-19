const mongoose=require('mongoose')


const DB=process.env.DATABASE

mongoose.connect(DB)
.then(()=>{
    console.log('connected with database');
})
.catch((err)=>{
    console.log(err);
})