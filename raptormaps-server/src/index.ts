import "reflect-metadata"
import express from 'express'
import {buildSchema} from 'type-graphql'

//Choose which type of database by commenting out line: 
//import { DatabaseResolver, connectToDB } from "./database/mongodb/mongodb-resolver"
import { DatabaseResolver, connectToDB } from "./database/inmemory/inmem-resolver"
import cors from 'cors';
import { GraphQLSchema } from "graphql";
import solar_farms from "./api/v1/solar_farms";
import { ApolloServer } from "apollo-server-express";

var graphQLSchema : GraphQLSchema;

const main = async () => {
    await connectToDB();
    const app = express();
    app.use(express.json());
    app.use(
        cors({
            origin: "http://localhost:3000"
        })
    );

    graphQLSchema = await buildSchema({
        resolvers: [DatabaseResolver], 
        validate: false
    });

    //only here for test (Disable during production)
    const apolloServer = new ApolloServer({
        schema: graphQLSchema
    });

    apolloServer.applyMiddleware({ app, cors: false });    

    app.use('/api/v1/solar_farms', solar_farms);
    
    app.listen(4000, () => {
        console.log('server started at 4000');
    });
}

main();
export {graphQLSchema};
