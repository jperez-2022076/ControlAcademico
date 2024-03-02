'use strict'
import mongoose from "mongoose"
export const connect = async()=>{
    try {
        mongoose.connection.on('error',()=>{
            console.log('No se pudo conectar')
            mongoose.disconnect()
        })
        return await mongoose.connect('mongodb://127.0.0.1:27017/ControlAcademico2022076')
    } catch (err) {
        console.error('Conexión de base de datos fallo')
    }
}