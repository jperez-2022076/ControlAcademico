'use strict'
import  Express from "express"
import { actulizarCurso, agregarCurso, eliminarCurso, test } from "./curso.controller.js"
import { curso, maestro, validateJwt } from "../middlewares/validate-jwm.js"

const api = Express.Router()

api.get('/testCurso',test)
api.post('/agregarCurso',[validateJwt, maestro], agregarCurso)
api.put('/actulizarCurso/:id',[validateJwt, maestro],actulizarCurso)
api.delete('/eliminarCurso/:id',[validateJwt, maestro],eliminarCurso)

export default api

