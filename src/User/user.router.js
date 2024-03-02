'use strict'
import express from 'express'



import { actualizar,  agregarAlumno, agregarMaestro, eliminar, getAlumno, getMaestro, login, test } from "./user.controller.js"
import { alumno, maestro, validateJwt } from '../middlewares/validate-jwm.js'


const api = express.Router()

api.get('/test',test)
api.get('/listarAlumno/:id',[validateJwt, alumno],getAlumno)
api.get('/listarMaestro/:id',[validateJwt,maestro],getMaestro)
api.post('/agregarAlumno',agregarAlumno)
api.post('/agregarMaestro',agregarMaestro)
api.post('/login',login)
api.put('/actualizar/:id',[validateJwt],actualizar)
api.delete('/eliminar/:id',[validateJwt],eliminar)




export default api