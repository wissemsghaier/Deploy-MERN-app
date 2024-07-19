const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  databaseUrl: { type: String, required: true },
  devUrl: { type: String, required: true },
  preProdUrl: { type: String, required: true },
  prodUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
