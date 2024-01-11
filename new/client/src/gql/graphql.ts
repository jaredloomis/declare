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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
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
  createCollection?: Maybe<Collection>;
  createElement?: Maybe<Element>;
  createTest?: Maybe<Test>;
  createUser?: Maybe<User>;
  executeTest?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  signup: Account;
  updateTest?: Maybe<Test>;
};


export type MutationCreateCollectionArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateElementArgs = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  selector: Scalars['String']['input'];
  selectorType: Scalars['String']['input'];
};


export type MutationCreateTestArgs = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  steps: Array<Scalars['JSON']['input']>;
};


export type MutationCreateUserArgs = {
  accountId: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  name: Scalars['String']['input'];
  steps: Array<Scalars['JSON']['input']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  test?: Maybe<Test>;
  user?: Maybe<User>;
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

export type Report = {
  __typename?: 'Report';
  duration: Scalars['Int']['output'];
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

export type TestStep = AssertExistsStep | AssertJavascriptStep | AssertTextStep | ClickStep | ExecuteJavascriptStep | GoToStep | SendTextStep;

export type TestStepResult = {
  __typename?: 'TestStepResult';
  endTime: Scalars['DateTime']['output'];
  error?: Maybe<Scalars['String']['output']>;
  screenshot?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ElementsQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;


export type ElementsQuery = { __typename?: 'Query', account?: { __typename?: 'Account', elements: Array<{ __typename?: 'Element', id: number, name: string, selector: string, selectorType: string }> } | null };

export type UpdateTestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  steps: Array<Scalars['JSON']['input']> | Scalars['JSON']['input'];
}>;


export type UpdateTestMutation = { __typename?: 'Mutation', updateTest?: { __typename?: 'Test', id: number } | null };

export type GetCollectionsQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
}>;


export type GetCollectionsQuery = { __typename?: 'Query', account?: { __typename?: 'Account', collections: Array<{ __typename?: 'Collection', id: number, name: string, tests: Array<{ __typename?: 'Test', id: number, name: string }> }> } | null };

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection?: { __typename?: 'Collection', id: number, name: string } | null };

export type CreateTestMutationVariables = Exact<{
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  steps: Array<Scalars['JSON']['input']> | Scalars['JSON']['input'];
}>;


export type CreateTestMutation = { __typename?: 'Mutation', createTest?: { __typename?: 'Test', id: number, name: string } | null };


export const ElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Elements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selector"}},{"kind":"Field","name":{"kind":"Name","value":"selectorType"}}]}}]}}]}}]} as unknown as DocumentNode<ElementsQuery, ElementsQueryVariables>;
export const UpdateTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"steps"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"steps"},"value":{"kind":"Variable","name":{"kind":"Name","value":"steps"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTestMutation, UpdateTestMutationVariables>;
export const GetCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const CreateTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"steps"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"steps"},"value":{"kind":"Variable","name":{"kind":"Name","value":"steps"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateTestMutation, CreateTestMutationVariables>;