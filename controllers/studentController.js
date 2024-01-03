const Student = require('../models/studentModel');
const Task = require('../models/taskModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentLogin = async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (!student || !await bcrypt.compare(req.body.password, student.password)) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ student, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

const viewTasks = async (req, res) => {
    try {
        const studentId = req.student._id;
        const tasks = await Task.find({ assignedTo: studentId });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findOne({ _id: taskId, assignedTo: req.student._id });

        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        task.status = req.body.status;
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { studentLogin, viewTasks, updateTaskStatus };
