const express=require('express')
const dataService=require('./services/data.service');//import data.service.js
const app=express();
app.use(express.json());
//GET READ
app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD")
})
//POST CREATE
app.post('/',(req,res)=>{
    res.send("THIS IS A post METHOD")
})
app.post('/register',(req,res)=>{
    console.log(req.body);
    const result=dataService.register(req.body.uname,req.body.acno,req.body.pswd)//call register function
    console.log(res.send(result.message))
})
//PUT UPDATE/MODIFY
app.put('/',(req,res)=>{
    res.send("THIS IS A put METHOD")
})
//PATCH UPDATE OR MODIFY PARTIALLY
app.patch('/',(req,res)=>{
    res.send("THIS IS A patch METHOD")
})

//DELETE
app.delete('/',(req,res)=>{
    res.send("THIS IS A delete METHOD")
})

app.listen(3000,()=>{console.log("server started at port 3000");})
