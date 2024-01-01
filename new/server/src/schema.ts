/**
 * GraphQL schema & resolvers
 */

import fs from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeTypeDefinition, JSONDefinition } from "graphql-scalars";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { BaseContext } from "@apollo/server";
import { PubSub } from "graphql-subscriptions";

import { LocalTestExecutor } from "./execution/executor";
import { SeleniumEngine } from "./execution/engine";
import { checkPassword, hashPassword } from "./auth";
import { User } from "./generated/graphql";
import {
  Account as AccountAdapter,
  invConvertObj,
  DatabaseToAPIAdapter,
  convertObj,
  Test as TestAdapter,
  User as UserAdapter,
  Report as ReportAdapter,
} from "./adapter";

// TODO create a pubsub backed by some external system:
// redis, postgres, rabbitmq, zeromq, kafka, etc.
const pubsub = new PubSub();

const typeDefs = fs.readFileSync("../common/graphql/schema.graphql", "utf8");

export const prisma = new PrismaClient();

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

function preprocessSelectionSet(selectionSet: any) {
  const ret: any = {};
  for (const selection of selectionSet.selections) {
    if (selection.name.value.indexOf("__") === 0) {
      continue;
    }
    if (selection.selectionSet) {
      ret[selection.name.value] = preprocessSelectionSet(
        selection.selectionSet,
      );
    } else {
      ret[selection.name.value] = true;
    }
  }
  return ret;
}

function postprocessSelectionSet(selectionSet: any) {
  const ret: any = {};
  for (const [key, value] of Object.entries(selectionSet)) {
    if (typeof value === "object") {
      ret[key] = { select: postprocessSelectionSet(value) };
    } else {
      ret[key] = value;
    }
  }
  return ret;
}

function createSelect(adapter: DatabaseToAPIAdapter, info: any) {
  const selectFields = preprocessSelectionSet(
    info.operation.selectionSet.selections[0].selectionSet,
  );
  const invMap = invConvertObj(selectFields, adapter);
  return postprocessSelectionSet(invMap);
}

function createResolver(
  adapter: DatabaseToAPIAdapter,
  queryFn: QueryResolverFn,
) {
  return async (obj: any, args: any, ctx: any, info: any) => {
    const select = createSelect(adapter, info);
    const retObj = await queryFn({ obj, args, ctx, info, select });
    const ret = convertObj(retObj, adapter);
    return ret;
  };
}

const resolvers = {
  Query: {
    account: createResolver(
      AccountAdapter,
      async ({ args, info, select, ctx }) => {
        if (!ctx.user || ctx.user.accountId !== args.id) {
          throw new Error("Not authorized");
        }

        return prisma.account.findUnique({
          where: {
            id: args.id,
          },
          select,
        });
      },
    ),
    user: createResolver(UserAdapter, async ({ args, info, select, ctx }) => {
      if (!ctx.user || ctx.user.accountId !== args.id) {
        throw new Error("Not authorized");
      }

      return prisma.user_info.findUnique({
        where: {
          id: args.id,
          account_id: ctx.user.accountId,
        },
        select,
      });
    }),
  },
  Mutation: {
    createAccount: (obj: any, args: any) => {
      return prisma.account.create({
        data: {
          name: args.name,
        },
      });
    },
    createUser: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user || ctx.user.accountId !== args.accountId) {
        throw new Error("Not authorized");
      }

      return prisma.user_info.create({
        data: {
          email: args.email,
          password: await hashPassword(args.password),
          account: {
            connect: {
              id: args.accountId,
            },
          },
        },
      });
    },
    createCollection: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user) {
        throw new Error("Not authorized");
      }

      return prisma.collection.create({
        data: {
          name: args.name,
          account: {
            connect: {
              id: ctx.user.accountId,
            },
          },
          user_info_collection_created_byTouser_info: {
            connect: {
              id: ctx.user!.id,
            },
          },
          user_info_collection_updated_byTouser_info: {
            connect: {
              id: ctx.user!.id,
            },
          },
        },
      });
    },
    createTest: async (obj: any, args: any, ctx: DeclareContext) => {
      // Check if collection belongs to user
      const collection = await prisma.collection.findFirst({
        where: {
          id: args.collectionId,
          account_id: ctx.user!.accountId,
        },
      });
      if (!collection) {
        throw new Error("Not authorized or collection does not exist");
      }

      // Create test
      const test = await prisma.test.create({
        data: {
          name: args.name,
          steps: args.steps,
          account: {
            connect: {
              id: ctx.user!.accountId,
            },
          },
          collection: {
            connect: {
              id: args.collectionId,
            },
          },
          user_info_test_created_byTouser_info: {
            connect: {
              id: ctx.user!.id,
            },
          },
          user_info_test_updated_byTouser_info: {
            connect: {
              id: ctx.user!.id,
            },
          },
        },
      });

      return test;
    },
    login: async (obj: any, args: any) => {
      const user = await prisma.user_info.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return null;
      }

      if (!(await checkPassword(args.password, user.password))) {
        return null;
      }

      return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
    },
    executeTest: async (obj: any, args: any, ctx: DeclareContext) => {
      if (!ctx.user) {
        throw new Error("Not authorized");
      }

      const test = await prisma.test.findFirst({
        where: {
          id: args.testId,
          account_id: ctx.user!.accountId,
        },
      });

      if (!test) {
        throw new Error("Not authorized or test does not exist");
      }

      new LocalTestExecutor(new SeleniumEngine())
        .executeTest(convertObj(test, TestAdapter))
        .then(async (report: any) => {
          report.id = undefined;
          report.user_info_report_created_byTouser_info = { connect: { id: ctx.user?.id } };
          report.test = { connect: { id: test.id } };
          report.test_id = undefined;
          report.user_info_report_updated_byTouser_info = { connect: { id: ctx.user?.id } };
          const dbReport = await prisma.report.create({ data: invConvertObj(report, ReportAdapter) });
          pubsub.publish("TEST_COMPLETED", { report: convertObj(dbReport, ReportAdapter) });
        });

      return true;
    },
  },
  Subscription: {
    executeTest: {
      subscribe: async function* (
        obj: any,
        args: any,
        ctx: DeclareContext | any,
      ) {
        if (!ctx.user) {
          throw new Error("Not authorized");
        }

        const test = await prisma.test.findFirst({
          where: {
            id: args.testId,
            account_id: ctx.user!.accountId,
          },
        });

        if (!test) {
          throw new Error("Not authorized or test does not exist");
        }

        const executor = new LocalTestExecutor(new SeleniumEngine());
        const report = await executor.executeTest(
          convertObj(test, TestAdapter),
        );
        yield { executeTest: report };
      },
    },
    report: {
      subscribe: async function* (
        obj: any,
        args: any,
        ctx: DeclareContext | any,
      ) {
        if (!ctx.user) {
          throw new Error("Not authorized");
        }

        const iter = pubsub.asyncIterator(["TEST_COMPLETED"]);

        while (true) {
          const { report } = (await iter.next()).value;
          yield { report };
        }
      },
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [typeDefs, DateTimeTypeDefinition, JSONDefinition],
});
