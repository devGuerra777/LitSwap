import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js'
// Esta funcion lo que nos permite es verificar si el usuario ya hizo login por el cual se obtiene un token
// para aacede a ciertas rutas

export const authRequired = (req,res,next) => {
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({message: "No token, authorization denied"}); //Si el usario no cuenta con token lo rechaza

        //Aqui se verifica que el token sea valido de acuerdo a la encriptación con la palabra TOKEN_SECRET.
        jwt.verify(token, TOKEN_SECRET, (err,user) => {
            if(err) return res.status(403).json({message: "Invalid Token"}); 
            req.user = user;
        })
    next()
}