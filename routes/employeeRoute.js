const employeeController = require('../controller/employeeController');
const employeeRouter = require('express').Router();
const passport = require('passport');

employeeRouter.post('/', passport.authenticate("jwt", { session: false }), employeeController.createEmployee);
employeeRouter.get('/', passport.authenticate("jwt", { session: false }), employeeController.getAllEmployees);

employeeRouter.get('/search', passport.authenticate("jwt", { session: false }), employeeController.getEmployeeWithAllParams);
employeeRouter.put('/:id', passport.authenticate("jwt", { session: false }), employeeController.updateEmployee);
employeeRouter.delete('/:id', passport.authenticate("jwt", { session: false }), employeeController.deleteEmployee);

module.exports = employeeRouter;