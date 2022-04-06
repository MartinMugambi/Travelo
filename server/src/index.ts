import {ApolloServer} from "apollo-server-express"
import { Query } from "./resolvers/Query";
import { typeDefs} from "./schema/schema";
import {Prisma, PrismaClient} from "@prisma/client"
import { Mutation } from "./resolvers/Mutations/mutation";
import { verifyToken } from "./utils/verifyToken";
import express from "express"
import {GraphQLUpload, graphqlUploadExpress} from "graphql-upload"
import { Post } from "./resolvers/Post";
import { User } from "./resolvers/User";

const prisma = new PrismaClient();


export interface Context{
  
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    userInfo: {
        user_id: number;
    } | null
}


async function startServer(){
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            // Upload: GraphQLUpload,
            Query,
           Mutation,
           Post,
           User
        }, 
        context:async ( {req}:any): Promise<Context>=>{
           const userInfo = await verifyToken(req.headers.authorization); 
           return {
               prisma,
               userInfo
           }
        }
    });

   await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

server.applyMiddleware({app});

 await new Promise<void>(r=> app.listen({port: 4000}, r));

 console.log(`server ready at http://localhost:4000${server.graphqlPath}`);
 
}

startServer();

 

