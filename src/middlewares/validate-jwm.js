'use strict'

import  Jwt  from "jsonwebtoken"
import User from "../User/user.model.js"
import detalleModel from "../detalle/detalle.model.js"

export const validateJwt = async(req,res,next)=>{
    try {
        let secretKey = '@LlaveSuperSecretaDe2022076@'
        let{token} = req.headers
        if(!token) return res.status(401).send({message:'No autorizado'})
        let{ uid } = Jwt.verify(token,secretKey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'No encuentra el usurio || No autorizado'})
        req.user = user
    next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message:'Invalido el token o expiro'})
    }

}

export const maestro = async(req,res,next)=>{
    try {
        let{rol,usuario} = req.user
        if(!rol || rol !== 'MAESTRO') return res.status(403).send({message: `No tiene acceso el usuario ${usuario}`})
        next()
    } catch (err) {
     console.error(err)
     return res.status(401).send({message: 'No eres Maestro'}) 
    }
}
export const curso = async(req,res,next)=>{
    try {
        let {id,usuario} = req.user
        let curso = await detalleModel.findOne({maestro: id})
        if(!curso || curso.usuario !== usuario) return res.status(404).send({message: 'No puedes modificar cursos que no estas asignado'})
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: 'No puedes modificar cursos que no estas asignado'})
    }
}

export const alumno = async(req,res,next)=>{
    try {
        let{rol,usuario} = req.user
        if(!rol || rol !== 'ALUMNO') return res.status(403).send({message: `No tiene acceso el usuario ${usuario}`})
        next()
   
    } catch (err) {
     console.error(err)
     return res.status(401).send({message: 'No eres ALUMNO'}) 
    }
}

