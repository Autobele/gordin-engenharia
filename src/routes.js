const express = require('express')
const router = express.Router()

const UserController = require('./app/controller/UserController')
const SessionController = require('./app/controller/SessionController')
const FuncionarioController = require('./app/controller/FuncionarioController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const dashboardMiddleware = require('./app/middlewares/dashboard')

//Login | Register Routes
router.get('/', guestMiddleware, SessionController.create)
router.post('/signin', guestMiddleware, SessionController.store)

router.post('/', UserController.store)
router.get('/signup', UserController.create)

//App Routes
router.use('/app', authMiddleware)
router.get('/app/dashboard', dashboardMiddleware)
router.get('/app/logout', SessionController.destroy)

//Routes Providers
router.get('/app/providers', FuncionarioController.index)
router.get('/app/providers/register', FuncionarioController.register)
router.get('/app/providers/register/:id', FuncionarioController.register)
router.put('/app/providers/register/:id', FuncionarioController.update)
router.post('/app/providers/create', FuncionarioController.store)

module.exports = router
