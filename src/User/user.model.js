import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    apellido:{
        type:String,
        required: true
    },
    usuario:{
        type: String,
        unique: true,
        lowerCase: true,
        required: true
    },
    contraseña:{
        type: String,
        minLenght:[8,'Contraseña muy pequeña'],
        required: true
    },
    telefono:{
        type:String,
        minLenght: 8,
        required: true
    },
    rol:{
        type:String,
        uppercase: true,
        enum: ['MAESTRO','ALUMNO'],
        required: true
    }

})

export default mongoose.model('User',UserSchema)