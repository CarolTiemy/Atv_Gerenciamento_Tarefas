const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.get('/', controller.getTasks);
router.post('/', controller.addTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
