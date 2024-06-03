//we can not have blocking code in stack
//we have to put it inside some async functions
const http=require('http');
const {readFile,writeFile}=require('fs').promises;
let file='';
const server=http.createServer((req,res)=>{
  const start= async()=>{
    file= await readFile('./public/index.html','utf-8');
  }
  start();
  res.end(file);
})
server.listen(3000)


