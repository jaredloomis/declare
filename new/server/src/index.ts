import { ApolloServer, BaseContext } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { expressMiddleware } from "@apollo/server/express4";
import { schema, prisma } from "./schema";
import cors from "cors";
import { authenticateUser } from "./auth";
import { Context, ErrorMessage } from "graphql-ws";
import { GraphQLError } from "graphql";
import * as dotenv from "dotenv";

dotenv.config();

interface DeclareContext extends BaseContext {
  user: any;
}

// Express + HTTP Server
const app = express();
const httpServer = createServer(app);

// WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// GraphQL Subscriptions server (over WebSocket)
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx: any) => {
      const authHeader =
        ctx.connectionParams.authorization ||
        ctx.connectionParams.Authorization;
      if (authHeader) {
        const token = authHeader.split(" ")[1] || "";
        const user = await authenticateUser(token);
        return { user };
      }
      return { user: null };
    },
    onError: (
      ctx: Context,
      message: ErrorMessage,
      errors: readonly GraphQLError[],
    ) => {
      return errors;
    },
  },
  wsServer,
);

// GraphQL HTTP server
const apolloServer = new ApolloServer<DeclareContext>({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Start servers
apolloServer.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware<DeclareContext>(apolloServer, {
      context: async ({ req }) => {
        const user = await authenticateUser(
          req.headers.authorization?.split(" ")[1] || "",
        );
        return {
          user,
        };
      },
    }),
  );

  app.use(express.static("../client/dist"));

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
});
