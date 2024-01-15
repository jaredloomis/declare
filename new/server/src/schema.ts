/**
 * GraphQL schema & resolvers
 */

import fs from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { DateTimeTypeDefinition, JSONDefinition } from 'graphql-scalars';
import jwt from 'jsonwebtoken';
import { BaseContext } from '@apollo/server';
import { PubSub } from 'graphql-subscriptions';

import { PubSubTestExecutionDelegator } from './execution/delegator';
import { checkPassword, hashPassword } from './auth';
import { User } from './generated/graphql';
import {
  Account as AccountAdapter,
  invConvertObj,
  DatabaseToAPIAdapter,
  convertObj,
  Test as TestAdapter,
  User as UserAdapter,
  Report as ReportAdapter,
  Element as ElementAdapter,
} from 'server-common/src/adapter';
import { prismaSelect } from './select';
import { prisma } from './client';

// TODO create a pubsub backed by some external system:
// Probably just a transient pubsub like redis (does rabbitmq support transient/non-durable messages)
const subscriptionPubsub = new PubSub();

const typeDefs = fs.readFileSync('../common/graphql/schema.graphql', 'utf8');

export interface DeclareContext extends BaseContext {
  user: User | undefined;
}

type QueryResolverFnArgs = {
  obj: any;
  args: any;
  ctx: DeclareContext;
  info: any;
  select: { [key: string]: string };
};
type QueryResolverFn = (obj: QueryResolverFnArgs) => Promise<any>;

function createResolver(adapter: DatabaseToAPIAdapter, queryFn: QueryResolverFn) {
  return async (obj: any, args: any, ctx: any, info: any) => {
    const select = prismaSelect(adapter, info);
    const retObj = await queryFn({ obj, args, ctx, info, select });
    const ret = convertObj(retObj, adapter);
    return ret;
  };
}

const resolvers = {
  Query: {
    account: createResolver(AccountAdapter, async ({ args, info, select, ctx }) => {
      if (!ctx.user || ctx.user.accountId !== args.id) {
        throw new Error('Not authorized');
      }

      const ret = await prisma.account.findUnique({
        where: {
          id: args.id,
        },
        select,
      });
      return ret;
    }),
    user: createResolver(UserAdapter, async ({ args, info, select, ctx }) => {
      if (!ctx.user || ctx.user.accountId !== args.id) {
        throw new Error('Not authorized');
      }

      return prisma.user_info.findUnique({
        where: {
          id: args.id,
          account_id: ctx.user.accountId,
        },
        select,
      });
    }),
    test: createResolver(TestAdapter, async ({ args, info, select, ctx }) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      console.log(info.fragments)

      const ret = await prisma.test.findUnique({
        where: {
          id: args.id,
          account_id: ctx.user.accountId,
        },
        select,
      });
      return ret;
    }),
  },
  Mutation: {
    signup: createResolver(AccountAdapter, async ({ args, info, select, ctx }) => {
      return prisma.account.create({
        data: {
          name: args.accountName,
          user_info: {
            create: {
              email: args.adminEmail,
              password: await hashPassword(args.adminPassword),
              is_admin: true,
            },
          },
        },
        select,
      });
    }),
    createUser: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      return prisma.user_info.create({
        data: {
          email: args.user.email,
          password: await hashPassword(args.user.password),
          account: {
            connect: {
              id: ctx.user.accountId,
            },
          },
        },
      });
    },
    createCollection: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      return prisma.collection.create({
        data: {
          name: args.collection.name,
          account: {
            connect: {
              id: ctx.user.accountId,
            },
          },
          created_by: {
            connect: {
              id: ctx.user!.id,
            },
          },
          updated_by: {
            connect: {
              id: ctx.user!.id,
            },
          },
        },
      });
    },
    createTest: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      // Check if collection belongs to user
      const collection = await prisma.collection.findFirst({
        where: {
          id: args.test.collectionId,
          account_id: ctx.user?.accountId,
        },
      });
      if (!collection) {
        throw new Error('Not authorized or collection does not exist');
      }

      // Create test
      const test = await prisma.test.create({
        data: {
          name: args.test.name,
          steps: args.test.steps,
          account: {
            connect: {
              id: ctx.user!.accountId,
            },
          },
          collection: {
            connect: {
              id: args.test.collectionId,
            },
          },
          created_by: {
            connect: {
              id: ctx.user!.id,
            },
          },
          updated_by: {
            connect: {
              id: ctx.user!.id,
            },
          },
        },
      });

      return test;
    },
    createElement: createResolver(ElementAdapter, async ({ obj, args, ctx, select }) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      // Check if collection belongs to user
      const collection = await prisma.collection.findFirst({
        where: {
          id: args.element.collectionId,
          account_id: ctx.user?.accountId,
        },
      });
      if (!collection) {
        throw new Error('Not authorized or collection does not exist');
      }

      // Create element
      const element = await prisma.element.create({
        data: {
          name: args.element.name,
          selector: args.element.selector,
          selector_type: args.element.selectorType,
          account: {
            connect: {
              id: ctx.user!.accountId,
            },
          },
          collection: {
            connect: {
              id: args.element.collectionId,
            },
          },
          created_by: ctx.user!.id,
          updated_by: ctx.user!.id,
        },
        select,
      });

      return element;
    }),
    updateTest: createResolver(TestAdapter, async ({ obj, args, ctx, select }) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      const test = await prisma.test.update({
        where: {
          id: args.id,
          account_id: ctx.user?.accountId,
        },
        data: {
          name: args.test.name,
          steps: args.test.steps,
          updated_by: {
            connect: {
              id: ctx.user!.id,
            },
          },
          updated_at: new Date(),
        },
        select,
      });

      if (!test) {
        throw new Error('Not authorized or test does not exist');
      }

      return test;
    }),
    login: async (obj: any, args: any) => {
      const user = await prisma.user_info.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error('Not authorized');
      }

      if (!(await checkPassword(args.password, user.password))) {
        throw new Error('Not authorized');
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '2d',
      });
    },
    executeTest: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user) {
        throw new Error('Not authorized');
      }

      const test = await prisma.test.findFirst({
        where: {
          id: args.testId,
          account_id: ctx.user!.accountId,
        },
      });

      if (!test) {
        throw new Error('Not authorized or test does not exist');
      }

      await new PubSubTestExecutionDelegator().executeTest(convertObj(test, TestAdapter));

      return true;
    },
  },
  Subscription: {
    report: {
      subscribe: async function* (obj: any, args: any, ctx: DeclareContext | any) {
        if (!ctx.user) {
          throw new Error('Not authorized');
        }

        const iter = subscriptionPubsub.asyncIterator(['TEST_COMPLETED']);

        while (true) {
          const { report } = (await iter.next()).value;
          yield { report };
        }
      },
    },
  },
  TestStep: {
    __resolveType: ({ stepType }: any) => {
      return stepType.charAt(0).toUpperCase() + stepType.slice(1) + 'Step';
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [typeDefs, DateTimeTypeDefinition, JSONDefinition],
});
