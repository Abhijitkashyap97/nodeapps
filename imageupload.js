const express = require('express');
const path=require('path')
const app = express();
const multer=require('multer')

//specifiactions of file is controlled 
//callback determines where the image is stored and how
const storage=multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null, 'Images')
    },
    //determine the filename
    filename: (req, file, callback)=>{
        console.log(file)
        callback(null, Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
const mysql=require('mysql')
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
app.get('/upload',(req,res)=>{
    res.render("upload");
})
//When user presses submit it will go to the upload middleware
app.post('/upload',upload.single('image'),(req,res)=>{
    res.send('Image Uploaded')
})
app.listen(5000)
