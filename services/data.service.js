let accountDetails={
    1000:{acno:1000,name:"userone",balance:50000,password:"user1"},
    1001:{acno:1002,name:"usertwo",balance:5000,password:"user2"},
    1002:{acno:1003,name:"userthree",balance:10000,password:"user3"},
    1003:{acno:1004,name:"userfour",balance:6000,password:"user4"}
    
  
    }
    const register=(uname,acno,pswd)=>{
        let user=accountDetails;
        if(acno in user)
        {
          //alert("User exists,please login")
            return {
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
              status:true,
              message:"sucessfully registerd"
          }
          
          
        }
      }
      module.exports={register}