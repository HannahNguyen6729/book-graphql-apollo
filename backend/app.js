import express, { json } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema/schema.js';
import { resolvers } from './resolver/resolver.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;
const app = express();

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
mongoose.set('strictQuery', false);
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('mongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
connectDb();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use('/graphql', cors(), json(), expressMiddleware(server));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
