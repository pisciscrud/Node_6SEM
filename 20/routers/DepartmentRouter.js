const express = require("express");
const departmentController = require("../controllers/departmentController.js");

const departmentRouter= express.Router();
departmentRouter.get('/',departmentController.getDepartments);
departmentRouter.get('/form',departmentController.addDepart);
departmentRouter.post('/form',departmentController.createDepart)
departmentRouter.get('/form/:id',departmentController.getInfoByID);
departmentRouter.put('/Update/:id',departmentController.updateDepartment);
departmentRouter.delete('/delete/:id',departmentController.DeleteDepart)
module.exports = departmentRouter;