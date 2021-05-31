let currentUser;
let accountDetails={
    1000:{acno:1000,name:"userone",balance:50000,password:"user1"},
    1001:{acno:1001,name:"usertwo",balance:5000,password:"user2"},
    1002:{acno:1002,name:"userthree",balance:10000,password:"user3"},
    1003:{acno:1003,name:"userfour",balance:6000,password:"user4"}
    
  
    }
    const register=(uname,acno,pswd)=>{
        let user=accountDetails;
        if(acno in user)
        {
          //alert("User exists,please login")
            return {
              statusCode:422,
            status:false,
            message:"user exists,please login"
            }

          
        }
        else{
          user[acno]={
            acno,
            username:uname,
           password:pswd,
            balance:0
          }
          
          return{
            statusCode:200,
              status:true,
              message:"sucessfully registerd"
          }
          
          
        }
      }
     const login=(req,acno,pswd)=>{
  
    let users=accountDetails
    if(acno in users)
    {
      if(pswd==users[acno]["password"])
      {
        
        req.session.currentUser=users[acno]
        
        return {
          statusCode:200,
          status: true,
          
          message:"sucessfully login"
        }
      
    }
      else{
        
        
        return {
          statusCode:422,
          status: false,
          
          message:"incorrect password"
        }
      }
    }
    else{
      
      return {
        statusCode:422,
        status: false,
        
        message:"invalid account"
      }
    }
  
  }
  const deposit=(acno,pswd,amt)=>{
    if(!req.session.currentUser)
    {
    return{
       statusCode:402,
        status: false,
        message:"please login"
      }
    }
    var amount=parseInt(amt)
    let user=accountDetails;
    if(acno in user)
    {
      if(pswd==user[acno]["password"])
      {
        user[acno]["balance"]+=amount;
        
        return {
          statusCode:200,
          status: true,

        balance:user[acno]["balance"],
        message:amount+ "credited and new balance is" +user[acno]["balance"]
      }
    }
      else{
        
        return {
          statusCode:422,
          status: false,
          message:"incorrect password"
        }
        
      }
    }
    else{
      
      return {
        statusCode:422,
        status: false,
        message:"invalid account"
      }
    }
  }
  const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    let user=accountDetails;
    if(acno in user)
    {
      if(pswd==user[acno]["password"])
      {
        if(user[acno]["balance"]>amount){
          user[acno]["balance"]-=amount;
          
        return {
          
          statusCode:200,
          status: true,
          balance:user[acno]["balance"],
          message:amount+"debited and new balance is"+user[acno]["balance"]
        }
        }
       else{
         
         return {
           statusCode:422,
           status: false,
           message:"insufficient balance"
         }
       }
      }
      else{
        
        return {
          statusCode:422,
          status: false,
          message:"incorrect password"
        }
      }
    }
    else{
      
      return {
        statusCode:422,
        status: false,
        message:"invalid account"
      }
    }
  }
      module.exports={register,
        login,
        deposit,
        withdraw
      }