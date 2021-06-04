const db = require('./db')
//let currentUser;
let accountDetails = {
  1000: { acno: 1000, username: "userone", balance: 50000, password: "user1" },
  1001: { acno: 1001, username: "usertwo", balance: 5000, password: "user2" },
  1002: { acno: 1002, username: "userthree", balance: 10000, password: "user3" },
  1003: { acno: 1003, username: "userfour", balance: 6000, password: "user4" }


}
const register = (uname, acno, pswd) => {
  return db.User.findOne({ acno })
    .then(user => {
      //console.log(user);
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "user exists,please login"

        }
      }
      else {
        const newUser = new db.User({


          acno,
          username: uname,
          password: pswd,
          balance: 0

        })
        newUser.save();
        return {
          statusCode: 200,
          status: true,
          message: "sucessfully registerd"
        }
      }
    })
  // let user=accountDetails;
  // if(acno in user)
  // {
  //   alert("User exists,please login")
  //     return {
  //       statusCode:422,
  //     status:false,
  //     message:"user exists,please login"


  //     }


  // }
  // else{
  //   user[acno]={
  //     acno,
  //     username:uname,
  //    password:pswd,
  //     balance:0
  //   }

  //   return{
  //     statusCode:200,
  //       status:true,
  //       message:"sucessfully registerd"
  //   }


  // }
}
const login = (req, acno, password) => {
  var acno = parseInt(acno)

  return db.User.findOne({ acno, password })
    .then(user => {

      if (user) {

        req.session.currentUser = user;
        return {
          statusCode: 200,
          status: true,

          message: "sucessfully login"
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,

          message: "invalid credentials"
        }
      }
    })
}

// let users = accountDetails
// if (acno in users) {
//   if (pswd == users[acno]["password"]) {

//     req.session.currentUser = users[acno]

//     return {
//       statusCode: 200,
//       status: true,

//       message: "sucessfully login"
//     }

//   }
//   else {


//     return {
//       statusCode: 422,
//       status: false,

//       message: "incorrect password"
//     }
//   }
// }
// else {

//   return {
//     statusCode: 422,
//     status: false,

//     message: "invalid account"
//   }
// }


const deposit = (acno, password, amt) => {


  //if(!req.session.currentUser)
  //{
  //return{
  //statusCode:402,
  //status: false,
  //message:"please login"
  //}
  //}
  var amount = parseInt(amt)
  return db.User.findOne({ acno, password })
    .then(user => {
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "invalid credentials"
        }
      }
      else {
        user.balance+= amount;
        user.save()
        return {
          statusCode: 200,
          status: true,
          balance: user.balance,
          message: amount + "credited and new balance is" + user.balance
        }
      }
    })
  // let user = accountDetails;
  // if (acno in user) {
  //   if (pswd == user[acno]["password"]) {
  //     user[acno]["balance"] += amount;

  //     return {
  //       statusCode: 200,
  //       status: true,

  //       balance: user[acno]["balance"],
  //       message: amount + "credited and new balance is" + user[acno]["balance"]
  //     }
  //   }
  //   else {

  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "incorrect password"
  //     }

  //   }
  // }
  // else {

  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "invalid account"
  //   }
  // }
}
const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, password })
    .then(user =>{
if(!user){
  return {
    statusCode: 422,
    status: false,
    message: "invalid Credentials"
  }
}
if(user.balance<amount)
{
  return {
    statusCode: 422,
    status: false,
    message: "insufficient balance"
  }
}
user.balance-=amount;
user.save();
return {

  statusCode: 200,
  status: true,
  balance: user.balance,
  message: amount + "debited and new balance is" + user.balance
}

    })
  }
//   let user = accountDetails;
//   if (acno in user) {
//     if (pswd == user[acno]["password"]) {
//       if (user[acno]["balance"] > amount) {
//         user[acno]["balance"] -= amount;

//         return {

//           statusCode: 200,
//           status: true,
//           balance: user[acno]["balance"],
//           message: amount + "debited and new balance is" + user[acno]["balance"]
//         }
//       }
//       else {

//         return {
//           statusCode: 422,
//           status: false,
//           message: "insufficient balance"
//         }
//       }
//     }
//     else {

//       return {
//         statusCode: 422,
//         status: false,
//         message: "incorrect password"
//       }
//     }
//   }
//   else {

//     return {
//       statusCode: 422,
//       status: false,
//       message: "invalid account"
//     }
//   }
// }
module.exports = {
  register,
  login,
  deposit,
  withdraw
}




