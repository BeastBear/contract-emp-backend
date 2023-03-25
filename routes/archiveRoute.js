const archiveController = require('../controller/archiveController');
const archiveRouter = require('express').Router();
const passport = require('passport');

archiveRouter.post('/', passport.authenticate("jwt", { session: false }), archiveController.createArchives);
archiveRouter.get('/', passport.authenticate("jwt", { session: false }), archiveController.getAllArchives);

archiveRouter.get('/search', passport.authenticate("jwt", { session: false }), archiveController.getArchiveWithAllParams);
archiveRouter.put('/:id', passport.authenticate("jwt", { session: false }), archiveController.updateArchive);
archiveRouter.delete('/:id', passport.authenticate("jwt", { session: false }), archiveController.deleteArchive);

module.exports = archiveRouter;