

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bankApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    
    username:String,
    acno:Number,
    password: String,
    balance: Number,
    


})

module.exports = {
    User
}






// const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost:27017/bankApp',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// const User=mongoose.model('User',{
//     acno:Number,
//     password:String,
//     balance:Number,
//     username:String
// })
// module.exports={
//     User
// }