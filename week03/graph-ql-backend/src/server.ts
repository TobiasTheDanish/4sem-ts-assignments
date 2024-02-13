import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { typeDefs, resolvers } from './schema';
interface Context {

}

const app = express();

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

app.get('/', (_req, res) => res.send("Hello there"));

app.listen(3000);
