const express=require('express')
const path=require('path')
const app=express()

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'))
})
app.get('/styles.css',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/styles.css'))
})
app.get('/index.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.js'))
})
app.all('*',(req,res)=>{
    res.status(404).send('Not Found')
})
app.listen(5000)
//Or use middleware
//app.use(express.static('public'))




