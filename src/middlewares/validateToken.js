import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js'
// Esta funcion lo que nos permite es verificar que exista un token para poder entrar

export const authRequired = (req,res,next) => {
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({message: "No token, authorization denied"}); //Si el usario no cuenta con token lo rechaza

        //Aqui se verifica que el token sea valido de acuerdo a la encripacion con la palabra TOKEN_SECRET en lo usuarios.
        jwt.verify(token, TOKEN_SECRET, (err,user) => {
            if(err) return res.status(403).json({message: "Invalid Token"});
            
            req.user = user;
        })
    next()
}