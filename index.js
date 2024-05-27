const express=require('express');
const app=express();
const path=require('path');
const Product=require('./models/product');
const mongoose=require('mongoose');
const methodOverride=require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log('Connected to mongo');
})
.catch((err)=>{
    console.log('OOPS! Connection failed');
    console.log(err);
})
app.get('/',(req,res)=>{
    res.send("HELLO");
})
app.get('/check',(req,res)=>{
    console.log('working fine');
    res.send('done right');
})
app.get('/products', async (req,res)=>{
     const prod = await Product.find({});
    res.render('products/index',{prod})
})
app.get('/products/add',(req,res)=>{
   // res.send("YES");
       res.render('products/new');
})
app.post('/products/adddprod',async (req,res)=>{
    const bod=req.body;
    Product.insertMany({
        name : bod.name,
        category:bod.category,
        price:bod.price
    })
    res.send('product added');
})
app.put('/products/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const prd=await Product.findByIdAndUpdate(id,req.body);
    console.log(req.body);
    res.redirect('/products');
})
app.get('/products/:id/edit', async (req,res)=>{
    const { id }=req.params;
    const tup=await Product.findById(id);
    res.render('edit',{tup});
})
app.get('/products/:id', async (req,res)=>{
    console.log("I got id Req");
    const {id}=(req.params);
    const fprod  = await Product.findById(id);
    if(fprod){
    console.log(fprod);
    res.render('products/show',{fprod});
    }
    else{
        res.render('products/');
    }
})
app.listen(3000,()=>{
    console.log('Listening on the port 3000');
})