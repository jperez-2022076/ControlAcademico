import { Schema, model } from "mongoose";

const DetalleSchema = Schema({
    curso:{
        type: Schema.ObjectId,
        ref: 'Cursos',
        required: true
    },
    alumno:{
        type: Schema.ObjectId,
        ref: 'alumno',
        
    },
    maestro:{
        type:Schema.ObjectId,
        ref:'Maestro',
        required: true
    }
})
export default model('Detalle',DetalleSchema)
