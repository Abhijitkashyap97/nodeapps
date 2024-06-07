const express=require('express')
const app=express()
const {products,people}=require('../node-express-course/02-express-tutorial/data.js')
const { compile } = require('morgan')
let myurl=require('url')
    app.use(express.static('./public'))
    app.use(express.urlencoded({extended:false}))
///A functional search bar
app.post('/login',(req,res)=>{
    myurl.search=req.body.search
    req.query={naam:myurl.search}
    console.log(req.query)
    const naam=req.query.naam
    let sproducts=[...products]
    if(naam){
       sproducts= sproducts.find((pr)=>{
         return pr.name.startsWith(naam);
        })
    }
    res.status(200).send(sproducts)
})
app.listen(5000)
app.all('*',(req,res)=>{
    res.send('Could not find resource')
})
