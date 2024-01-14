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
    "\n  mutation CreateElement($element: ElementCreateInput!) {\n    createElement(element: $element) {\n      id\n      name\n    }\n  }\n": types.CreateElementDocument,
    "\n  query Elements($accountId: Int!) {\n    account(id: $accountId) {\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n": types.ElementsDocument,
    "\n  query Collections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n      }\n    }\n  }\n": types.CollectionsDocument,
    "\n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      id\n    }\n  }\n": types.UpdateTestDocument,
    "\n  query GetCollections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetCollectionsDocument,
    "\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      ": types.CreateTestDocument,
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
export function graphql(source: "\n  mutation CreateElement($element: ElementCreateInput!) {\n    createElement(element: $element) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateElement($element: ElementCreateInput!) {\n    createElement(element: $element) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Elements($accountId: Int!) {\n    account(id: $accountId) {\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n"): (typeof documents)["\n  query Elements($accountId: Int!) {\n    account(id: $accountId) {\n      elements {\n        id\n        name\n        selector\n        selectorType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Collections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Collections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {\n    updateTest(id: $id, test: $test) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCollections($accountId: Int!) {\n    account(id: $accountId) {\n      collections {\n        id\n        name\n        tests {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      "): (typeof documents)["\n        mutation CreateTest($test: TestCreateInput!) {\n          createTest(test: $test) {\n            id\n            name\n          }\n        }\n      "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;