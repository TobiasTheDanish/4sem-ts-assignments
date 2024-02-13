import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { typeDefs, resolvers } from './schema';
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();
// Specify the path where we'd like to mount our server
//highlight-start
app.use('/graphql', cors(), express.json(), expressMiddleware(server));
//highlight-end
