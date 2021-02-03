import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import {MyContext} from "./MyContext";


//we expext the user to send a header called authorization with takes bearer infront then 

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) =>{
    const authorization = context.req.headers["authorization"]
    if(!authorization){
        throw new Error('not authenticated!!')
    }
    try{
        const token = authorization.split("")[1]
        const payload = verify(token,process.env.ACCESS_TOKEN_SECRET!)
        context.payload = payload as any;
    }catch(err){
        console.log(err)
        throw new Error("not authenticated!!")
    }
    return next()
}