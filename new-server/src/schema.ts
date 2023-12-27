/**
 * GraphQL schema & resolvers
 */

import fs from "fs";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { DateTimeTypeDefinition, JSONDefinition } from 'graphql-scalars';
import { PrismaClient } from "@prisma/client";
import { checkPassword, hashPassword } from "./auth";
import jwt from "jsonwebtoken";

const typeDefs = fs.readFileSync('./graphql/schema.graphql', 'utf8');

export const prisma = new PrismaClient();

const resolvers = {
  Query: {
    account: (ctx: any, args: any, req: any, query: any) => {
      console.log(req);
      return prisma.account.findUnique({
        where: {
          id: args.id,
        },
        select: {

        },
      });
    }
  },
  Mutation: {
    createAccount: (ctx: any, args: any) => {
      return prisma.account.create({
        data: {
          name: args.name,
        }
      });
    },
    createUser: async (ctx: any, args: any) => {
      return prisma.user_info.create({
        data: {
          email: args.email,
          password: await hashPassword(args.password),
          account: {
            connect: {
              id: args.accountId,
            }
          }
        }
      });
    },
    login: async (ctx: any, args: any) => {
      const user = await prisma.user_info.findFirst({
        where: {
          email: args.email,
        },
      });

      if(!user) {
        return null;
      }

      if(!await checkPassword(args.password, user.password)) {
        return null;
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
    },
  }
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [typeDefs, DateTimeTypeDefinition, JSONDefinition],
});
