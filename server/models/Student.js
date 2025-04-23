const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: String,
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  department: String,
  enrollmentYear: Number,
  isActive:String

});

module.exports = mongoose.model('Student', studentSchema);
