const companyController = require('../controller/companyController');
const companyRouter = require('express').Router();
const passport = require('passport');

companyRouter.post('/', passport.authenticate("jwt", { session: false }), companyController.createCompany);
companyRouter.get('/', passport.authenticate("jwt", { session: false }), companyController.getAllCompanies);

companyRouter.get('/search', passport.authenticate("jwt", { session: false }), companyController.getCompanyWithAllParams);
companyRouter.put('/:id', passport.authenticate("jwt", { session: false }), companyController.updateCompany);
companyRouter.delete('/:id', passport.authenticate("jwt", { session: false }), companyController.deleteCompany);

module.exports = companyRouter;