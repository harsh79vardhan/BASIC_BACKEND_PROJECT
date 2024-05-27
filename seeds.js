const mongoose=require('mongoose');
const Product=require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>{
    console.log('Connected to mongo');
})
.catch((err)=>{
    console.log('OOPS! Connection failed');
    console.log(err);
})
// const p=new Product({
//     name:'Apple',
//     price:10,
//     category:'fruit'
// })
// p.save().then(p=>{
//     console.log(p);
// })
// .catch(e=>{
//     console.log(e);
// })
Product.insertMany([
    {
        name:'Cucumber',
        price:20,
        category:'vegetable'
    },
    {
        name:'Carrot',
        price:40,
        category:'vegetable'
    }
]
)
.then(p=>{
    console.log(p);
})
.catch(e=>{
    console.log('oops, failed to fill data');
})
