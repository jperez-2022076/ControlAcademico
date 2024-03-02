import {Schema, model} from "mongoose";
const CursoSchema = Schema({
    nombre:{
        type:String,
        required: true
    },
    descripcion:{
        type:String,
        required: true
    }
})
export default model('Cursos',CursoSchema)