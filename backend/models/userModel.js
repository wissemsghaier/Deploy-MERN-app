// const mongoose = require ('mongoose')


// const userShema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role:{
//     type:String,
//      default: 'USER',
//   },
//   password: {
//     type: String,
//     required: true,
//   },

// });



// const User  = mongoose.model('user' ,  userShema)
// module.exports= User;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'USER',
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;


