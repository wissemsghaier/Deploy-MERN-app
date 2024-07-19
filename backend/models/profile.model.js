const mongoose = require("mongoose");



const UserProfile = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      role: { type: String,  default: 'USER' },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProfileModel = mongoose.model('Profile', UserProfile);
module.exports = ProfileModel;


