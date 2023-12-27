import  express  from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, prisma } from "./schema";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
app
  .use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  }));

const PORT = process.env.PORT || 4000;
console.log(`Server running at http://localhost:${PORT}/graphql`)
app.listen(PORT);
