const express=require('express')
const { readFile } = require('fs')
const app=express()
const path=require('path')
const mysql=require('mysql')
const bcrypt=require('bcrypt')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const {readFileSync}=require('fs').promises
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node_mysql'
})
db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('Connection Established')
    }
})
let file=async()=>{
    const f=await readFile('./signup.html')
    return f;
}

app.get('/',(req,res)=>{
    console.log(req.body)
    res.sendFile(path.resolve('signup.html'))
})
let msg=''

app.post('/login',(req,res)=>{
    const name=req.body.text
    const password=req.body.password
    console.log(password)
    bcrypt.hash(password,10,(err,hash)=>{
        console.log(`${hash}`)
        let sql=`INSERT INTO signup VALUES('','${name}','${hash}')`
        db.query(sql,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                msg='Signed Up'
            }
        })
    })
    res.send(msg)
})
app.listen(5000)
