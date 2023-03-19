const express =require('express')
const dotenv=require('dotenv')

// declaring path for env file only have to do in app.js root of project
dotenv.config({path:'./config.env'})
const app=express();
app.use(express.json())
// making connection with the database
require('./DATABASE/dbConnection')

// requiring Routers module by use of middlware
app.use(require('./Routers'))


app.listen(5000,()=>{
    console.log('listening to port 5000');
})