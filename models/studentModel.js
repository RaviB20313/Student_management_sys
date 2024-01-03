// studentModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  password: String
});

studentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;


