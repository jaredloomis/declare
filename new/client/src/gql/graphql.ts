/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  __typename?: 'Account';
  collections: Array<Collection>;
  createdAt: Scalars['DateTime']['output'];
  elements: Array<Element>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  suites: Array<Suite>;
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
};

export type AssertExistsStep = {
  __typename?: 'AssertExistsStep';
  elementId: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
  /**
   * If true, the element must be visible as well as being present in the DOM.
   * default: false.
   */
  visible?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * Asserts that the given javascript code evaluates to true when executed
 * in the test browser.
 */
export type AssertJavascriptStep = {
  __typename?: 'AssertJavascriptStep';
  code: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
};

export type AssertTextStep = {
  __typename?: 'AssertTextStep';
  elementId: Scalars['Int']['output'];
  exactMatch?: Maybe<Scalars['Boolean']['output']>;
  invert?: Maybe<Scalars['Boolean']['output']>;
  stepType: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ClickStep = {
  __typename?: 'ClickStep';
  elementId: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type CollectionCreateInput = {
  name: Scalars['String']['input'];
};

export type Element = {
  __typename?: 'Element';
  accountId: Scalars['Int']['output'];
  collectionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  selector: Scalars['String']['output'];
  selectorType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type ElementCreateInput = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  selector: Scalars['String']['input'];
  selectorType: Scalars['String']['input'];
};

export type ExecuteJavascriptStep = {
  __typename?: 'ExecuteJavascriptStep';
  code: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
};

export type GoToStep = {
  __typename?: 'GoToStep';
  stepType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ImportTestStep = {
  __typename?: 'ImportTestStep';
  stepType: Scalars['String']['output'];
  testId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: Collection;
  createElement: Element;
  createTest: Test;
  createUser: User;
  executeTest: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  signup: Account;
  updateTest: Test;
};

export type MutationCreateCollectionArgs = {
  collection: CollectionCreateInput;
};

export type MutationCreateElementArgs = {
  element: ElementCreateInput;
};

export type MutationCreateTestArgs = {
  test: TestCreateInput;
};

export type MutationCreateUserArgs = {
  user: UserInput;
};

export type MutationExecuteTestArgs = {
  testId: Scalars['Int']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSignupArgs = {
  accountName: Scalars['String']['input'];
  adminEmail: Scalars['String']['input'];
  adminPassword: Scalars['String']['input'];
};

export type MutationUpdateTestArgs = {
  id: Scalars['Int']['input'];
  test: TestUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  test: Test;
  user: User;
};

export type QueryAccountArgs = {
  id: Scalars['Int']['input'];
};

export type QueryTestArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RefreshStep = {
  __typename?: 'RefreshStep';
  stepType: Scalars['String']['output'];
};

export type Report = {
  __typename?: 'Report';
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  stepResults: Array<TestStepResult>;
  testId: Scalars['Int']['output'];
};

export type SendTextStep = {
  __typename?: 'SendTextStep';
  elementId: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type SetVariableElement = {
  __typename?: 'SetVariableElement';
  elementId: Scalars['Int']['output'];
};

export type SetVariableJavascript = {
  __typename?: 'SetVariableJavascript';
  code: Scalars['String']['output'];
};

/** Set a variable which can be used in later steps like so: {{variable_name}}. */
export type SetVariableStep = {
  __typename?: 'SetVariableStep';
  name: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
  value: SetVariableStepValue;
};

export type SetVariableStepValue = SetVariableElement | SetVariableJavascript | SetVariableString;

export type SetVariableStepValueInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  elementId?: InputMaybe<Scalars['Int']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
};

export type SetVariableString = {
  __typename?: 'SetVariableString';
  string: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  executeTest?: Maybe<Report>;
  report: Report;
};

export type SubscriptionExecuteTestArgs = {
  testId: Scalars['Int']['input'];
};

export type Suite = {
  __typename?: 'Suite';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type SuiteInput = {
  name: Scalars['String']['input'];
};

export type Test = {
  __typename?: 'Test';
  accountId: Scalars['Int']['output'];
  collectionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  reports: Array<Report>;
  steps: Array<TestStep>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type TestCreateInput = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  steps: Array<TestStepInput>;
};

export type TestStep =
  | AssertExistsStep
  | AssertJavascriptStep
  | AssertTextStep
  | ClickStep
  | ExecuteJavascriptStep
  | GoToStep
  | RefreshStep
  | SendTextStep;

export type TestStepInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  elementId?: InputMaybe<Scalars['Int']['input']>;
  exactMatch?: InputMaybe<Scalars['Boolean']['input']>;
  invert?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stepType: Scalars['String']['input'];
  testId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<SetVariableStepValueInput>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TestStepResult = {
  __typename?: 'TestStepResult';
  endTime: Scalars['DateTime']['output'];
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  screenshot?: Maybe<Scalars['String']['output']>;
  status: TestStepStatus;
};

export enum TestStepStatus {
  Error = 'ERROR',
  Fail = 'FAIL',
  None = 'NONE',
  Pass = 'PASS',
}

export type TestUpdateInput = {
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<Array<TestStepInput>>;
};

export type User = {
  __typename?: 'User';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = { __typename?: 'Mutation'; login: string };

export type SignUpMutationVariables = Exact<{
  accountName: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignUpMutation = { __typename?: 'Mutation'; signup: { __typename?: 'Account'; id: number } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  user: { __typename?: 'User'; id: number; accountId: number; email: string };
};

export type CreateElementMutationVariables = Exact<{
  element: ElementCreateInput;
}>;

export type CreateElementMutation = {
  __typename?: 'Mutation';
  createElement: { __typename?: 'Element'; id: number; name: string };
};

export type ElementsQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;

export type ElementsQuery = {
  __typename?: 'Query';
  account: {
    __typename?: 'Account';
    elements: Array<{ __typename?: 'Element'; id: number; name: string; selector: string; selectorType: string }>;
  };
};

export type CollectionsQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;

export type CollectionsQuery = {
  __typename?: 'Query';
  account: { __typename?: 'Account'; collections: Array<{ __typename?: 'Collection'; id: number; name: string }> };
};

export type UpdateTestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  test: TestUpdateInput;
}>;

export type UpdateTestMutation = {
  __typename?: 'Mutation';
  updateTest: { __typename?: 'Test' } & { ' $fragmentRefs'?: { CoreTestFieldsFragment: CoreTestFieldsFragment } };
};

export type GetCollectionsQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;

export type GetCollectionsQuery = {
  __typename?: 'Query';
  account: {
    __typename?: 'Account';
    collections: Array<{
      __typename?: 'Collection';
      id: number;
      name: string;
      tests: Array<{ __typename?: 'Test'; id: number; name: string }>;
    }>;
  };
};

export type CreateTestMutationVariables = Exact<{
  test: TestCreateInput;
}>;

export type CreateTestMutation = {
  __typename?: 'Mutation';
  createTest: { __typename?: 'Test'; id: number; name: string };
};

export type CoreTestFieldsFragment = {
  __typename?: 'Test';
  id: number;
  name: string;
  steps: Array<
    | { __typename?: 'AssertExistsStep' }
    | { __typename?: 'AssertJavascriptStep' }
    | { __typename?: 'AssertTextStep' }
    | { __typename?: 'ClickStep'; stepType: string; elementId: number }
    | { __typename?: 'ExecuteJavascriptStep' }
    | { __typename?: 'GoToStep' }
    | { __typename?: 'RefreshStep' }
    | { __typename?: 'SendTextStep'; stepType: string; elementId: number; text: string }
  >;
} & { ' $fragmentName'?: 'CoreTestFieldsFragment' };

export type GetTestQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetTestQuery = {
  __typename?: 'Query';
  test: {
    __typename?: 'Test';
    reports: Array<{ __typename?: 'Report'; id: number; testId: number; startTime: any }>;
  } & { ' $fragmentRefs'?: { CoreTestFieldsFragment: CoreTestFieldsFragment } };
};

export type CreateCollectionMutationVariables = Exact<{
  collection: CollectionCreateInput;
}>;

export type CreateCollectionMutation = {
  __typename?: 'Mutation';
  createCollection: { __typename?: 'Collection'; id: number };
};

export const CoreTestFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CoreTestFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Test' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'steps' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ClickStep' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'stepType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'elementId' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SendTextStep' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'stepType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'elementId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
} as unknown as DocumentNode<CoreTestFieldsFragment, unknown>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountName' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signup' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'adminEmail' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'adminPassword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const CreateElementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateElement' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'element' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ElementCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createElement' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'element' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'element' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateElementMutation, CreateElementMutationVariables>;
export const ElementsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Elements' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'elements' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'selector' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'selectorType' } },
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
} as unknown as DocumentNode<ElementsQuery, ElementsQueryVariables>;
export const CollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Collections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
} as unknown as DocumentNode<CollectionsQuery, CollectionsQueryVariables>;
export const UpdateTestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateTest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'test' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TestUpdateInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'test' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'test' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CoreTestFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CoreTestFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Test' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'steps' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ClickStep' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'stepType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'elementId' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SendTextStep' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'stepType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'elementId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
} as unknown as DocumentNode<UpdateTestMutation, UpdateTestMutationVariables>;
export const GetCollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tests' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
export const CreateTestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateTest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'test' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TestCreateInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'test' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'test' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTestMutation, CreateTestMutationVariables>;
export const GetTestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'test' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CoreTestFields' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reports' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'testId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CoreTestFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Test' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'steps' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ClickStep' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'stepType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'elementId' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SendTextStep' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'stepType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'elementId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
} as unknown as DocumentNode<GetTestQuery, GetTestQueryVariables>;
export const CreateCollectionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCollection' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'collection' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CollectionCreateInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'collection' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'collection' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
