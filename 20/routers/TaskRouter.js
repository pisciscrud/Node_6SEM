const express = require("express");
const taskController = require("../controllers/TaskController.js");


const taskRouter = express.Router();

taskRouter.get('/',taskController.getTask);
taskRouter.get('/overdue',taskController.GetOverdue)
taskRouter.get('/noverdue',taskController.GetNOverdue)
taskRouter.get('/form',taskController.addTask);
taskRouter.post('/form',taskController.createTask);
taskRouter.get('/form/:id',taskController.GetInfoById);
 taskRouter.put('/Update/:id',taskController.updateTask);
 taskRouter.delete('/delete/:id',taskController.deleteTask);

module.exports = taskRouter;