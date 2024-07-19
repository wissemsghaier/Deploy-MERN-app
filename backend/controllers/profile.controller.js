// const { Result } = require('antd');
// const ProfileModel = require('../models/profile.model'); 
// const ValidateProfile = require('../validation/Profile');



// const AddProfile = async (req ,res)=>{
//     const {errors, isValid} = ValidateProfile(req.body)
//     try {
//         if(!isValid){
//           res.status(404).json(errors)
//         }else{
//             ProfileModel.findOne({user: req.user.id})
//         .then(async (profile)=>{
//             if(!profile){
//                 req.body.user = req.user.id
//                 await ProfileModel.create(req.body)
//                 res.status(200).json({message: "success"})
//             }else{
//                await  ProfileModel.findOneAndUpdate(
//                     {_id: profile._id},
//                     req.body,
//                     {new: true}
//                 ).then(result=>{
//                     res.status(200).json(result)
//                 })
//             }
//         })
//         }
//     } catch (error) {
//          res.status(404).json(error.message)
//     }
// }



// const FindAllProfiles = async (req ,res)=>{
//     try {
//         const data =  await ProfileModel.find().populate('user', ["name", "email", "role"])
//         res.status(200).json(data)
 
//      } catch (error) {
//          res.status(404).json(error.message)
//      }
//  }


// const FindSingleProfile = async  (req , res ) =>{ 
//     try {
//         const data =  await ProfileModel.findOne({user: req.user.id}).populate('user', ["name", "email", "role"])
//         res.status(200).json(data)
 
//      } catch (error) {
//          res.status(404).json(error.message)
//      }
// }



// const DeleteProfile = async (req, res) => {
//     try {
//         const data =  await ProfileModel.findOneAndRemove({_id: req.params.id})
//         res.status(200).json({message: "deleted"})
 
//      } catch (error) {
//          res.status(404).json(error.message)
//      }
// }


// const UpdateProfile = async (req, res) => {
//     const { errors, isValid } = ValidateProfile(req.body);
//     try {
//         if (!isValid) {
//             return res.status(400).json(errors);
//         }

//         const { id } = req.params;
//         const updatedProfile = req.body;

//         // Vérifier si le profil existe pour l'utilisateur actuel
//         const profile = await ProfileModel.findOne({ _id: id, user: req.user.id });
//         if (!profile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }

//         // Mettre à jour le profil
//         const updated = await ProfileModel.findByIdAndUpdate(id, updatedProfile, { new: true });

//         res.status(200).json(updated);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// };








// module.exports= {
//     AddProfile,
//     FindAllProfiles,
//     FindSingleProfile,
//     DeleteProfile, 
//     UpdateProfile
// }


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ProfileModel = require('../models/profile.model'); 
const User = require('../models/userModel');
const ValidateProfile = require('../validation/Profile');

const AddProfile = async (req, res) => {
  const { errors, isValid } = ValidateProfile(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { firstName, lastName, address, phone, city, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: req.body.role || 'developer',
    });

    const newUser = await user.save();

    const newProfile = new ProfileModel({
      user: newUser._id,
      firstName,
      lastName,
      address,
      phone,
      city,
      email,
      password: hashedPassword,
    });

    await newProfile.save();

    res.status(201).json({ message: 'Profile and user account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Les autres fonctions restent inchangées
const FindAllProfiles = async (req, res) => {
  try {
    const data = await ProfileModel.find().populate('user', ['name', 'email', 'role']);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
}

const FindSingleProfile = async (req, res) => {
  try {
    const data = await ProfileModel.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'role']);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
}

const DeleteProfile = async (req, res) => {
  try {
    const data = await ProfileModel.findOneAndRemove({ _id: req.params.id });
    await User.findByIdAndDelete(data.user);
    res.status(200).json({ message: 'Profile and user account deleted' });
  } catch (error) {
    res.status(404).json(error.message);
  }
}

const UpdateProfile = async (req, res) => {
  const { errors, isValid } = ValidateProfile(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;
    const updatedProfile = req.body;

    const profile = await ProfileModel.findOne({ _id: id, user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const updated = await ProfileModel.findByIdAndUpdate(id, updatedProfile, { new: true });

    await User.findByIdAndUpdate(profile.user, { email: updatedProfile.email, role: updatedProfile.role });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  AddProfile,
  FindAllProfiles,
  FindSingleProfile,
  DeleteProfile,
  UpdateProfile
}
