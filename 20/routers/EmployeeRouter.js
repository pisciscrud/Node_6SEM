const express = require("express");
const employeeController = require("../controllers/EmployeeController.js");

const employeeRouter= express.Router();

employeeRouter.get('/',employeeController.getEmployee);
employeeRouter.get('/form',employeeController.addEmployee);
employeeRouter.post('/form',employeeController.createEmployee);
employeeRouter.get('/form/:id',employeeController.GetInfoById);
 employeeRouter.put('/Update/:id',employeeController.updateEmployee);
 employeeRouter.delete('/delete/:id',employeeController.deleteEmployee);

module.exports = employeeRouter;