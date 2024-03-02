'use strict'

import cursoModel from './curso.model.js'

export const test =(req,res)=>{
    return res.send('Hello Word')
}


export const agregarCurso = async(req,res)=>{

    try {
        let datos = req.body
        let curso = new cursoModel(datos)
        await curso.save()
        return res.send({message: 'Curso agregado '})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al agregar'})

    }   
}

export const actulizarCurso = async (req,res)=>{
  
    try {
        let {id} = req.params
        let datos = req.body
    
        let actualizarC = await cursoModel.findOneAndUpdate(
            {_id: id},
            datos,
            {new: true}
        )
        if(!actualizarC)return res.status(401).send({message:'No se encontro el curso y no se actualizo'})
        return res.send({message: `curso actualizado`,actualizarC})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No se pudo actulizar el curso'})
        
    }

}

export const eliminarCurso = async(req,res)=>{
    try {
        let { id } = req.params;
        let porDefectoCurso = await cursoModel.findOne({ nombre: 'Por_Defecto' });
        let deleteCurso = await cursoModel.findOneAndDelete({ _id: id });
        if (!deleteCurso) return res.status(404).send({ message: 'No se encontró el curso y no se eliminó' });
        // Cambiar el ID del curso eliminado al ID del curso "Por_Defecto"
        deleteCurso._id = porDefectoCurso._id;
        await deleteCurso.save();

        return res.send({ message: `El curso ${deleteCurso.nombre} fue eliminado y su ID fue cambiado  Por_Defecto` });
      } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al eliminar curso'})
    }
}

export const agregarCursoDeterminado = async () => {
    try {
        let datos = {
            nombre: 'Por_Defecto',
            descripcion: 'No tiene curso'
        };

        let user = new cursoModel(datos);
        await user.save();

       
    } catch (err) {
        
    }
};