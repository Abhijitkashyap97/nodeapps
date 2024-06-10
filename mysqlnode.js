const express = require('express');
const path=require('path')
const app = express();
app.use(express.static('public'))
const mysql=require('mysql')
const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node_mysql'
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
    console.log('Connection established')
    }
});
app.get('/create_table',(req,res)=>{
    let sql='CREATE TABLE POSTS(id INT AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))';
        db.query(sql,(err,res)=>{
            if(err.code==="ER_TABLE_EXISTS_ERROR"){
                console.log('Table h pehle se')
            }
            
        });
        res.send('Table created successfully')
});
app.get('/addposts',(req,res)=>{
    const fr='Fifth'
    let sql=`INSERT INTO POSTS VALUES('','${fr} POST','yo THIS THE ${fr} POST')`
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('inserted successfully')
        }
    })
    res.send('Done ')
})
let posts=''
app.get('/show',(req,res)=>{
    let sql="SELECT* FROM posts"
    
    db.query(sql,(err,res)=>{
        if(err)
            throw err;
        res.forEach(element => {
            posts=posts+element.title+`<br>`
        })});
        res.send(posts)
    })
    let single=''
app.get('/show/:title',(req,res)=>{
    let sql=`SELECT* FROM posts WHERE title ='${req.params.title}'`;
    db.query(sql,(err,res)=>{
        if(err){
            throw err;
        }
        else{
        single=res[0].title
        }
    })
    console.log(single)
    res.send(single)
})
let updated=''
app.get('/update/:id',(req,res)=>{
    const id=Number(req.params.id);
    const sql=`UPDATE posts SET title='Third Post' WHERE id ='${id}'`;
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(res)}});
    res.send('updated')
})

app.listen(5000)
