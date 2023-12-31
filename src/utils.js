import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";


//disckstorage => almacenamiento en memoria
const storageFiles = multer.diskStorage({
    //destino de las imagenes a guardar
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"/public/img"))
    },
    //filename: nombre del archivo a guardar
    filename: function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

//mildware del multer
export const uploader = multer({storage:storageFiles});

export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

export const isValidPassword = (userDB,password)=>{
    return bcrypt.compareSync(password,userDB.password);
}

//token gmail para que el link mantenga el token actualizado
export const validateToken = (token)=>{
    try {
        const info = jwt.verify(token,config.gmail.secretToken);
        return info.email;
    } catch (error) {
        console.log("Error con el token", error.message);
        return null;
    }
};

