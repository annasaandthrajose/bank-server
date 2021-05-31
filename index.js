const express=require('express')
const session=require('express-session');
const dataService=require('./services/data.service');//import data.service.js
const app=express();
app.use(session({
    secret: 'randomsecurestring',
    resave:false,
    saveUninitialized:false
})
    )
app.use(express.json());
app.use((req,res,next)=>{
    console.log("middleware");
    next();
})
const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next();
}
app.use(logMiddleware);
const authMiddleware=(req,res,next)=>{
if(!req.session.currentUser)
    {
      return res.json ({
          statusCode:401,
        status: false,
        message:"please login"
      })
        
    }
    else{
        next();
    }

}
//GET READ
app.get('/',(req,res)=>{
    res.status(401).send("THIS IS A GET METHOD")
})
//POST CREATE
app.post('/',(req,res)=>{
    res.send("THIS IS A post METHOD")
})
//post for register
app.post('/register',(req,res)=>{
    //console.log(req.body);
    const result=dataService.register(req,req.body.uname,req.body.acno,req.body.pswd)//call register function
    res.status(result.statusCode).json(result);
    //console.log(res.status(result.statusCode).json(result))
})
//POST For login
app.post('/login',(req,res)=>{
    //console.log(req.body);
    const result= dataService.login(req,req.body.acno,req.body.pswd)//call register function
    res.status(result.statusCode).json(result);
    //console.log(res.status(result.statusCode).json(result))
})
//POST FOR DEPOSIT
app.post('/deposit',authMiddleware,(req,res)=>{
    //console.log(req.session.currentUser);
    console.log(req.body);
    const result= dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)//call register function
    res.status(result.statusCode).json(result);
    //console.log(res.status(result.statusCode).json(result))
})
//POST FOR WITHDRAW
app.post('/withdraw',authMiddleware,(req,res)=>{
    //console.log(req.body);
    const result= dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)//call register function
    res.status(result.statusCode).json(result);
    //console.log(res.status(result.statusCode).json(result))
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
