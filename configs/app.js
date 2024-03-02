import  Express  from "express";
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import UserRouter from '../src/User/user.router.js'
import CursosRouter from '../src/Curso/curso.router.js'

import DetalleRoutes from '../src/detalle/detalle.routers.js'


const app = Express()
config()
const port = process.env.PORT || 3200

app.use(Express.urlencoded({extended: false}))
app.use(Express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))



// declarar rutas

app.use(UserRouter)
app.use(CursosRouter)
app.use(DetalleRoutes)




export const initServer = ()=>{
    app.listen(port)
    console.log(`Ruta del HTTP es  ${port}`)
}