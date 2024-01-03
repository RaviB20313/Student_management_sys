const express = require('express');
const { adminLogin, addStudent, assignTask } = require('../controllers/adminControllers.js');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/students', addStudent);
router.post('/tasks/assign', assignTask);

module.exports = router;
