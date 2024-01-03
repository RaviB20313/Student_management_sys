const Student = require('../models/studentModel');
const Task = require('../models/taskModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();

const adminLogin = async (req, res) => {
  // Logic for admin login
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    
    const adminPassword = process.env.ADMIN_PASSWORD; 

    
        if (email === adminEmail && password== adminPassword) {
    
        const token = jwt.sign({ email: adminEmail }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({ token });
    }
    res.status(401).send({ error: 'Invalid credentials' });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }

};

const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

const assignTask = async (req, res) => {
  // Logic to assign a task to a student
};

module.exports = { adminLogin, addStudent, assignTask };
