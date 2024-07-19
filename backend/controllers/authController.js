// const bcrypt = require('bcryptjs');
// const jwt = require ('jsonwebtoken');

// const User = require ('../models/userModel');
// const createError = require('../utils/appError');






// // register users 
// exports.signup = async (req,res,next)=>{



//     // try {
//     //     const user = await User.findOne({email : req.body.email});
//     //     if(user){
//     //         return next (new createError("user already exist ! , 400"));
//     //     }
//     //     const hashedPassword = await bcrypt.hash(req.body.password , 12);

//     //     const newUser = await User.create({
//     //         ...req.body,
//     //         password : hashedPassword,
//     //     });




//     try {
//         const user = await User.findOne({email : req.body.email});
//         if(user){
//             return next (new createError("user already exist ! , 400"));
//         }
//         const hashedPassword = await bcrypt.hash(req.body.password , 12);

//         const newUser = await User.create({
//             ...req.body,
//             password : hashedPassword,
//         });

//         // assign JWT (json web tocken) to user  
//         const tocken = jwt.sign({_id : newUser._id}, 'secretkey123', {
//             expiresIn: '90d',
//         });

//         res.status(201).json({
//             status: 'success',
//             message: 'user registred sucessfully ',
//             tocken,
//             user: {
//                 _id : newUser._id,
//                 name: newUser.name,
//                 email: newUser.email,
//                 role: newUser.role,
    
//             },
//         });

//     }catch(error){
//         next(error);

//     }

// };


// // logging users 
// exports.login = async (req, res, next ) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) 
//         return next (new createError('user not found ', 404));
      
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return next(new createError ('Incorrect email or password ' , 401));
//       }


//       // assign JWT (json web tocken) to user  
//       const tocken = jwt.sign({ id : user._id, role: user.role}, 'secretkey123', {
//         expiresIn: '90d',
//     });
//       res.status(200).json({
//         status : 'success',
//         tocken,
//         message : "logged in successfully ",
//         user: {
//             _id : user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,

//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   };



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

// Enregistrer des utilisateurs
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError('User already exists!', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
      expiresIn: '90d',
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Connexion des utilisateurs
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new createError('User not found', 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError('Incorrect email or password', 401));
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey123', {
      expiresIn: '90d',
    });

    res.status(200).json({
      status: 'success',
      token,
      message: 'Logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
