import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
// import { Query } from "typeorm/driver/Query";



(async()=>{

    const app = express();
    app.get('/',(_req,res)=>res.send('Hello '))

    await createConnection();

    const apolloServer = new ApolloServer({
       schema : await buildSchema({
           resolvers:[UserResolver]
       }),
       context:({req,res}) =>({req,res})
    });
    apolloServer.applyMiddleware({app})
    app.listen(2000, ()=>{
        console.log("server is listening at port 2000 ")
    })

})()