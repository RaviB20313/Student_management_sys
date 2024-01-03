const express = require('express');
const { studentLogin, viewTasks, updateTaskStatus } = require('../controllers/studentController.js');
const authMiddleware = require('../middleware/authMiddleware.js'); 

const router = express.Router();

router.post('/login', studentLogin);
router.get('/tasks', authMiddleware, viewTasks);
router.patch('/tasks/:taskId', authMiddleware, updateTaskStatus);

module.exports = router;
