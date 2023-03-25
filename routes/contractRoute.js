const contractController = require('../controller/contractController');
const contractRouter = require('express').Router();
const passport = require('passport');

contractRouter.post('/', passport.authenticate("jwt", { session: false }), contractController.createContract);
contractRouter.get('/', passport.authenticate("jwt", { session: false }), contractController.getAllContracts);

contractRouter.get('/search', passport.authenticate("jwt", { session: false }), contractController.getContractWithAllParams);
contractRouter.put('/:id', passport.authenticate("jwt", { session: false }), contractController.updateContract);
contractRouter.delete('/:id', passport.authenticate("jwt", { session: false }), contractController.deleteContract);

module.exports = contractRouter;