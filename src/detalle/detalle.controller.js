'use strict'

import detalleModel from "./detalle.model.js"
import User from '../User/user.model.js'
import cursoModel from "../Curso/curso.model.js"

export const agregarMaestroACurso = async(req,res)=>{
    try {
        let datos = req.body
        let detalleExistente = await detalleModel.findOne({  curso: datos.curso})
        if (detalleExistente) return res.status(400).send({ message: 'Este curso ya tiene un maestro asignado.' })
        let existeDetalle = await detalleModel.findOne({
            maestro: datos.maestro,
            curso: datos.curso
        })
        if (existeDetalle) return res.status(400).send({ message: 'El maestro ya está asignado a este curso.' })
        let user = await User.findOne({_id: datos.maestro})
        if(!user) return res.status(404).send({message:'No se encotro el maestro'})
        let curso = await cursoModel.findOne({_id: datos.curso})
        if(!curso) return res.status(404).send({message: 'No se encontro el curso'}) 
        let detalle = new detalleModel(datos)
        await detalle.save()
        return res.send({message:`Se agrego al maestro ${user.nombre} el curso de ${curso.nombre}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: ' no se puedo agregar '})
    }
}
export const agregarAlumnoACurso = async (req, res) => {
    try {
        let datos = req.body;
        let alumno = await User.findOne({ _id: datos.alumno });
        if (!alumno) return res.status(404).send({ message: 'No se encontró el alumno' });
        let cursoExistente = await detalleModel.findOne({ alumno: datos.alumno, curso: datos.curso });
        if (cursoExistente) return res.status(400).send({ message: 'El alumno ya está en este curso' });
        let cursosDelAlumno = await detalleModel.find({ alumno: datos.alumno });
        if (cursosDelAlumno.length >= 3) {
            return res.status(400).send({ message: 'El alumno ya tiene asignados 3 cursos, no se puede agregar más cursos' });
        }
        let curso = await cursoModel.findOne({ _id: datos.curso });
        if (!curso) return res.status(404).send({ message: 'No se encontró el curso' });
        let detalles = await detalleModel.findOne({ curso: datos.curso });
        if (!detalles) return res.status(404).send({ message: 'No se encontró información del curso' });
        let maestro = await User.findOne({ _id: detalles.maestro });
        if (!maestro) return res.status(404).send({ message: 'No se encontró información del maestro' });
        return res.send({
            message: `Se agregó al alumno ${alumno.nombre} al curso de ${curso.nombre} con el maestro ${maestro.nombre}`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'No se pudo agregar el alumno al curso' });
    }
};
