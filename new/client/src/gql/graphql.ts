/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type Account = {
  __typename?: "Account";
  collections: Array<Collection>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  suites: Array<Suite>;
  tests: Array<Test>;
  updatedAt: Scalars["DateTime"]["output"];
  users: Array<User>;
};

export type Collection = {
  __typename?: "Collection";
  accountId: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  createdBy: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  tests: Array<Test>;
  updatedAt: Scalars["DateTime"]["output"];
  updatedBy: Scalars["Int"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAccount: Account;
  createCollection?: Maybe<Collection>;
  createTest?: Maybe<Test>;
  createUser?: Maybe<User>;
  executeTest?: Maybe<Scalars["Boolean"]["output"]>;
  login?: Maybe<Scalars["String"]["output"]>;
};

export type MutationCreateAccountArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateCollectionArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateTestArgs = {
  collectionId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  steps: Scalars["JSON"]["input"];
};

export type MutationCreateUserArgs = {
  accountId: Scalars["Int"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationExecuteTestArgs = {
  testId: Scalars["Int"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  account?: Maybe<Account>;
  user?: Maybe<User>;
};

export type QueryAccountArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryUserArgs = {
  id: Scalars["Int"]["input"];
};

export type Report = {
  __typename?: "Report";
  duration: Scalars["Int"]["output"];
  endTime: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  startTime: Scalars["DateTime"]["output"];
  status: Scalars["String"]["output"];
  stepResults: Scalars["JSON"]["output"];
  testId: Scalars["Int"]["output"];
};

export type Subscription = {
  __typename?: "Subscription";
  executeTest?: Maybe<Report>;
  report: Report;
};

export type SubscriptionExecuteTestArgs = {
  testId: Scalars["Int"]["input"];
};

export type Suite = {
  __typename?: "Suite";
  accountId: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  createdBy: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  tests: Array<Test>;
  updatedAt: Scalars["DateTime"]["output"];
  updatedBy: Scalars["Int"]["output"];
};

export type Test = {
  __typename?: "Test";
  accountId: Scalars["Int"]["output"];
  collectionId: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  createdBy: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  reports: Array<Report>;
  steps?: Maybe<Scalars["JSON"]["output"]>;
  suiteId: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  updatedBy: Scalars["Int"]["output"];
};

export type User = {
  __typename?: "User";
  accountId: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  password: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type GetCollectionsQueryVariables = Exact<{
  accountId: Scalars["Int"]["input"];
}>;

export type GetCollectionsQuery = {
  __typename?: "Query";
  account?: {
    __typename?: "Account";
    collections: Array<{
      __typename?: "Collection";
      id: number;
      name: string;
      tests: Array<{ __typename?: "Test"; id: number; name: string }>;
    }>;
  } | null;
};

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars["String"]["input"];
}>;

export type CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection?: {
    __typename?: "Collection";
    id: number;
    name: string;
  } | null;
};

export const GetCollectionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCollections" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "accountId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "account" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "accountId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tests" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const CreateCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;
