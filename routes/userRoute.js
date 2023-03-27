const userController = require('../controller/userController')
const userRouter = require('express').Router()
const passport = require("passport")

userRouter.post('/admin', userController.createAdminUser)
userRouter.post('/register',passport.authenticate("jwt" , { session: false }), userController.registerUser)
userRouter.post('/login',passport.authenticate("jwt" , { session: false }), userController.loginUser)
userRouter.get('/info', passport.authenticate("jwt" , { session: false }), userController.getInfoUser)
userRouter.get('/', passport.authenticate("jwt" , { session: false }), userController.getAllUsers)

userRouter.get('/search', passport.authenticate("jwt" , { session: false }), userController.getUserWithAllParams)
userRouter.put('/:id', passport.authenticate("jwt", { session: false }), userController.updateUser)
userRouter.put('/', passport.authenticate("jwt", { session: false }), userController.updateUser)
userRouter.delete('/:id', passport.authenticate("jwt", { session: false }), userController.deleteUser)

module.exports = userRouter