const express=require('express')
const app=express();
//GET READ
app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD")
})
//POST CREATE
app.post('/',(req,res)=>{
    res.send("THIS IS A post METHOD")
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
