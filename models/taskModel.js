// taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  description: String,
  dueTime: Date,
  status: { type: String, default: 'pending' }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;