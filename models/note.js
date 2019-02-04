const mongoose = require('mongoose');

const { Schema } = mongoose;

const project = new Schema(
  {
    column: String,
    title: String,
    content: String,
    responsible: String
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', project);

module.exports = Project;
