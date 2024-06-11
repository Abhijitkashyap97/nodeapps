const express = require('express');
const path=require('path')
const app = express();
app.use(express.json());app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
const mysql=require('mysql')
const session=require('express-session')
app.use(session({
    secret:"Some Secret",
    resave:false,
    saveUinitialized:false
}))
const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node_mysql'
});
db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
    console.log('Connection established')
    }
});
let a='';
function login(name,pass){
    return new Promise((resolve,reject)=>{
        let sql=`SELECT* FROM signup WHERE Username='${name}' AND password='${pass}'`;
    db.query(sql,(err,res)=>{
        if(err){
        return reject('Server error')
        }
        else{
            a=res;
            let len=a.length
            if(len===0){
                return resolve('Not found')
            }
            else{
                global.name=a.Username;
              return resolve('Found');
            }}})
    })
}
app.post('/login',async(req,response)=>{
    if(req.body.Enter==='Enter'){
    const name=req.body.name;
    const pass=req.body.pass
    try{
        const res=await login(name,pass)
        req.session.isAuth=true;
        req.session.username = a[0].Username;
        response.redirect('/users');
    }
    catch{
        response.status(401).send('Not Authorized!')
    }
}})
function authenticate(req,res,next){
    if(req.session.isAuth){
        next()
    }
    else{
        res.staus(401).send='Not Authorized!'
    }
}
app.get('/users',authenticate,(req,res)=>{
    console.log(req.session.username)
    res.send(`Welcome ${req.session.username}`)    
})
app.listen(5000)
