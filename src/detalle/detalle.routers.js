'use strict'

import { Router } from "express"
import { agregarAlumnoACurso, agregarMaestroACurso } from "./detalle.controller.js"
import { maestro, validateJwt } from "../middlewares/validate-jwm.js"

const api = Router()

api.post('/agregarMaestroACurso',[validateJwt,maestro],agregarMaestroACurso)
api.post('/agregarAlumnoACursos',[validateJwt],agregarAlumnoACurso)
export default api 