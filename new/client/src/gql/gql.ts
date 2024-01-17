/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n    mutation Login($username: String!, $password: String!) {\n      login(email: $username, password: $password)\n    }\n  ':
    types.LoginDocument,
  '\n    mutation SignUp($accountName: String!, $username: String!, $password: String!) {\n      signup(accountName: $accountName, adminEmail: $username, adminPassword: $password) {\n        id\n      }\n    }\n  ':
    types.SignUpDocument,
  '\n    query GetUser($id: Int!) {\n      user(id: $id) {\n        id\n        accountId\n        email\n      }\n    }\n  ':
    types.GetUserDocument,
  '\n  mutation CreateElement($element: ElementCreateInput!) {\n    createElement(element: $element) {\n      id\n      name\n    }\n  }\n':
    types.CreateElementDocument,
  '\n  query Elements {\n    account {\n      id\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n':
    types.ElementsDocument,
  '\n  \n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      ...CoreTestFields\n    }\n  }\n':
    types.UpdateTestDocument,
  '\n  mutation DeleteTest($id: Int!) {\n    deleteTest(id: $id)\n  }\n': types.DeleteTestDocument,
  '\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      ':
    types.CreateTestDocument,
  '\n  fragment CoreTestFields on Test {\n    id\n    name\n    steps {\n      ... on GoToStep {\n        stepType\n        url\n      }\n      ... on WaitStep {\n        stepType\n        milliseconds\n      }\n      ... on ClickStep {\n        stepType\n        elementId\n      }\n      ... on SendTextStep {\n        stepType\n        elementId\n        text\n      }\n      ... on AssertExistsStep {\n        stepType\n        elementId\n        visible\n      }\n      ... on ExecuteJavascriptStep {\n        stepType\n        code\n      }\n      ... on RefreshStep {\n        stepType\n      }\n      ... on AssertTextStep {\n        stepType\n        elementId\n        text\n      }\n      ... on SetVariableStep {\n        stepType\n        name\n        value {\n          ... on SetVariableString {\n            string\n          }\n          ... on SetVariableElement {\n            elementId\n          }\n          ... on SetVariableJavascript {\n            code\n          }\n        }\n      }\n      ... on ImportTestStep {\n        stepType\n        testId\n      }\n    }\n  }\n':
    types.CoreTestFieldsFragmentDoc,
  '\n  \n  query GetTest($id: Int!) {\n    test(id: $id) {\n      ...CoreTestFields\n      collectionId\n      reports {\n        id\n        testId\n        startTime\n      }\n    }\n  }\n':
    types.GetTestDocument,
  '\n  query Tests {\n    account {\n      id\n      tests {\n        id\n        name\n      }\n    }\n  }\n':
    types.TestsDocument,
  '\n  query Collections {\n    account {\n      id\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.CollectionsDocument,
  '\n  mutation CreateCollection($collection: CollectionCreateInput!) {\n    createCollection(collection: $collection) {\n      id\n    }\n  }\n':
    types.CreateCollectionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation Login($username: String!, $password: String!) {\n      login(email: $username, password: $password)\n    }\n  '
): (typeof documents)['\n    mutation Login($username: String!, $password: String!) {\n      login(email: $username, password: $password)\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation SignUp($accountName: String!, $username: String!, $password: String!) {\n      signup(accountName: $accountName, adminEmail: $username, adminPassword: $password) {\n        id\n      }\n    }\n  '
): (typeof documents)['\n    mutation SignUp($accountName: String!, $username: String!, $password: String!) {\n      signup(accountName: $accountName, adminEmail: $username, adminPassword: $password) {\n        id\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GetUser($id: Int!) {\n      user(id: $id) {\n        id\n        accountId\n        email\n      }\n    }\n  '
): (typeof documents)['\n    query GetUser($id: Int!) {\n      user(id: $id) {\n        id\n        accountId\n        email\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateElement($element: ElementCreateInput!) {\n    createElement(element: $element) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateElement($element: ElementCreateInput!) {\n    createElement(element: $element) {\n      id\n      name\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Elements {\n    account {\n      id\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Elements {\n    account {\n      id\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      ...CoreTestFields\n    }\n  }\n'
): (typeof documents)['\n  \n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      ...CoreTestFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteTest($id: Int!) {\n    deleteTest(id: $id)\n  }\n'
): (typeof documents)['\n  mutation DeleteTest($id: Int!) {\n    deleteTest(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      '
): (typeof documents)['\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CoreTestFields on Test {\n    id\n    name\n    steps {\n      ... on GoToStep {\n        stepType\n        url\n      }\n      ... on WaitStep {\n        stepType\n        milliseconds\n      }\n      ... on ClickStep {\n        stepType\n        elementId\n      }\n      ... on SendTextStep {\n        stepType\n        elementId\n        text\n      }\n      ... on AssertExistsStep {\n        stepType\n        elementId\n        visible\n      }\n      ... on ExecuteJavascriptStep {\n        stepType\n        code\n      }\n      ... on RefreshStep {\n        stepType\n      }\n      ... on AssertTextStep {\n        stepType\n        elementId\n        text\n      }\n      ... on SetVariableStep {\n        stepType\n        name\n        value {\n          ... on SetVariableString {\n            string\n          }\n          ... on SetVariableElement {\n            elementId\n          }\n          ... on SetVariableJavascript {\n            code\n          }\n        }\n      }\n      ... on ImportTestStep {\n        stepType\n        testId\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CoreTestFields on Test {\n    id\n    name\n    steps {\n      ... on GoToStep {\n        stepType\n        url\n      }\n      ... on WaitStep {\n        stepType\n        milliseconds\n      }\n      ... on ClickStep {\n        stepType\n        elementId\n      }\n      ... on SendTextStep {\n        stepType\n        elementId\n        text\n      }\n      ... on AssertExistsStep {\n        stepType\n        elementId\n        visible\n      }\n      ... on ExecuteJavascriptStep {\n        stepType\n        code\n      }\n      ... on RefreshStep {\n        stepType\n      }\n      ... on AssertTextStep {\n        stepType\n        elementId\n        text\n      }\n      ... on SetVariableStep {\n        stepType\n        name\n        value {\n          ... on SetVariableString {\n            string\n          }\n          ... on SetVariableElement {\n            elementId\n          }\n          ... on SetVariableJavascript {\n            code\n          }\n        }\n      }\n      ... on ImportTestStep {\n        stepType\n        testId\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  query GetTest($id: Int!) {\n    test(id: $id) {\n      ...CoreTestFields\n      collectionId\n      reports {\n        id\n        testId\n        startTime\n      }\n    }\n  }\n'
): (typeof documents)['\n  \n  query GetTest($id: Int!) {\n    test(id: $id) {\n      ...CoreTestFields\n      collectionId\n      reports {\n        id\n        testId\n        startTime\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Tests {\n    account {\n      id\n      tests {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Tests {\n    account {\n      id\n      tests {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Collections {\n    account {\n      id\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Collections {\n    account {\n      id\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateCollection($collection: CollectionCreateInput!) {\n    createCollection(collection: $collection) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateCollection($collection: CollectionCreateInput!) {\n    createCollection(collection: $collection) {\n      id\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
