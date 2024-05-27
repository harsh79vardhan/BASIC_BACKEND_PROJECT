const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log('Connected to mongo');
})
.catch((err)=>{
    console.log('OOPS! Connection failed');
    console.log(err);
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
