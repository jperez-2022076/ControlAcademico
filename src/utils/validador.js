import { compare,hash } from "bcrypt";

export const encrypt = async(password)=>{
    try {
        return await hash(password,10)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const verificarContraseña = async(contraseña,hash)=>{
    try {
        return await compare(contraseña,hash)
    } catch (err) {
        console.error(err)
        return err
        
    }
}

export const verificarActualizacion = (datos,userId)=>{
    if(userId){
        if(
            Object.entries(datos).length === 0 ||
            datos.contraseña ||
            datos.contraseña == ''  ||
            datos.rol ||
            datos.rol == ''
        ) return false
        return true
    }else{
        return false
    }
}