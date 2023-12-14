const express = require('express')
const routes = express.Router()
const controller = require('../controllers/emp.controller')

routes.get('/employees', controller.getAlls)
routes.get('/employees/:id', controller.getOneEmp)
routes.post('/employees', controller.createEmployee)
routes.delete('/employees/:id', controller.deleteOne)
routes.put('/employees/:id', controller.updateOne)


module.exports = routes