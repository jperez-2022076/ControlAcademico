'use strict'

import { encrypt, verificarActualizacion, verificarContraseña } from "../utils/validador.js"
import User from './user.model.js'
import detalleModel from "../detalle/detalle.model.js"
import { generateJwt } from "../utils/jwt.js"


export const test = (req,res)=>{
    return res.send('Hola')
}

export const agregarAlumno = async(req,res)=>{
    try {
        let data = req.body
        data.contraseña = await encrypt(data.contraseña)
        data.rol= 'ALUMNO'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registrado satisfactoriamente'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al Agregar usuario',err})
        
    }
}

export const agregarMaestro = async(req,res)=>{
    try {
        let data = req.body
        data.contraseña = await encrypt(data.contraseña)
        data.rol= 'MAESTRO'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registrado satisfactoriamente'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al Agregar usuario',err})
        
    }
}


export const login = async(req,res)=>{
    try {
        let{usuario,contraseña} = req.body
        let user = await User.findOne({usuario})
        if(user && await verificarContraseña(contraseña, user.contraseña)){
            let usuarioLogueado ={
                uid: user._id,
                usuario: user.usuario,
                nombre: user.nombre,
                rol: user.rol
            }
            let token = await generateJwt(usuarioLogueado)
            return res.send({message: `Bienvenido ${user.nombre}`,usuarioLogueado,token})
        }
        return res.status(404).send({message: 'Usuario o contraseña incorrecta'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Fallo al iniciar secion'})
        
    }
}
export const getMaestro = async (req, res) => {
    try {
        let { id } = req.params;
        let usuario = await detalleModel.find({ maestro: id }).populate('curso', ['nombre', 'descripcion']);

        if (usuario.length > 0) {
            const cursosInfo = usuario
                .filter(detalle => detalle.curso) // Filtrar los documentos con curso no nulo o indefinido
                .map(detalle => ({
                    nombre: detalle.curso.nombre,
                    descripcion: detalle.curso.descripcion,
                }));

            return res.send({ cursos: cursosInfo });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'No tiene asignado cursos' });
    }
};
export const getAlumno = async(req,res)=>{
    try {
        let { id } = req.params;
          let  usuario = await detalleModel.find({ alumno: id }).populate('curso', ['nombre', 'descripcion']);
        if (usuario.length > 0) {
            const cursosInfo = usuario
            .filter(detalle => detalle.curso)
            .map(detalle => ({
                nombre: detalle.curso.nombre,
                descripcion: detalle.curso.descripcion,
            }));

            return res.send({ cursos: cursosInfo });
        } 
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No tiene asignado cursos'})
    }
}

export const actualizar = async(req,res)=>{
    try {
        let {id}= req.params
        let datos = req.body
        let actu = verificarActualizacion(datos,id)
        if(!actu)return res.status(400).send({message: 'Han enviado algunos datos que no se pueden actualizar '})
        let actualizar = await User.findOneAndUpdate(
            {_id: id},
            datos,
            {new: true}
            ) 
            if(!actualizar) return res.status(401).send({message: 'No funciono la actualizacion'})
            return res.send({message: 'Actualizado usuario',actualizar})

    } catch (err) {
        console.error(err)
        if(err.keyValue.usuario)return res.status(400).send({message: `el usuario ${err.keyValue.usuario} ya esta en uso`})
        return res.status(500).send({message:'Error al actulizar cuenta'})
        
    }
}
export const eliminar = async(req,res)=>{
        try {
            let {id} = req.params
            let eliminar = await User.findOneAndDelete({_id: id})
            if(!eliminar) return res.status(404).send({message:'No se encontro la cuenta y no se pudo eliminar'})
            return res.send({message: `Se elimino al usuario ${eliminar.usuario} satisfactoriamente`})
        } catch (err) {
            console.error(err)
            return res.status(500).send({message:'Error al eliminar usuario'})
        }
}

export const agregarMaestroDeterminado = async () => {
    try {
        let datos = {
            nombre: 'Josue',
            apellido: 'Noj',
            usuario: 'Jnoj',
            contraseña :  '12345678',
            telefono: '12345678',
            rol: 'MAESTRO',
        };

        let user = new User(datos);
        await user.save();

        console.log('Maestro agregado correctamente',datos)
    } catch (err) {
        
    }
};
