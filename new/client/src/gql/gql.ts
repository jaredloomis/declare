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
  '\n  query Elements($accountId: Int!) {\n    account(id: $accountId) {\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n':
    types.ElementsDocument,
  '\n  query Collections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n      }\n    }\n  }\n':
    types.CollectionsDocument,
  '\n  \n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      ...CoreTestFields\n    }\n  }\n':
    types.UpdateTestDocument,
  '\n  query GetCollections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GetCollectionsDocument,
  '\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      ':
    types.CreateTestDocument,
  '\n  fragment CoreTestFields on Test {\n    id\n    name\n    steps {\n      ... on ClickStep {\n        stepType\n        elementId\n      }\n      ... on SendTextStep {\n        stepType\n        elementId\n        text\n      }\n    }\n  }\n':
    types.CoreTestFieldsFragmentDoc,
  '\n  \n  query GetTest($id: Int!) {\n    test(id: $id) {\n      ...CoreTestFields\n      reports {\n        id\n        testId\n        startTime\n      }\n    }\n  }\n':
    types.GetTestDocument,
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
  source: '\n  query Elements($accountId: Int!) {\n    account(id: $accountId) {\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Elements($accountId: Int!) {\n    account(id: $accountId) {\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Collections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Collections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n      }\n    }\n  }\n'];
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
  source: '\n  query GetCollections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetCollections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n'];
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
  source: '\n  fragment CoreTestFields on Test {\n    id\n    name\n    steps {\n      ... on ClickStep {\n        stepType\n        elementId\n      }\n      ... on SendTextStep {\n        stepType\n        elementId\n        text\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CoreTestFields on Test {\n    id\n    name\n    steps {\n      ... on ClickStep {\n        stepType\n        elementId\n      }\n      ... on SendTextStep {\n        stepType\n        elementId\n        text\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  \n  query GetTest($id: Int!) {\n    test(id: $id) {\n      ...CoreTestFields\n      reports {\n        id\n        testId\n        startTime\n      }\n    }\n  }\n'
): (typeof documents)['\n  \n  query GetTest($id: Int!) {\n    test(id: $id) {\n      ...CoreTestFields\n      reports {\n        id\n        testId\n        startTime\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateCollection($collection: CollectionCreateInput!) {\n    createCollection(collection: $collection) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateCollection($collection: CollectionCreateInput!) {\n    createCollection(collection: $collection) {\n      id\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
