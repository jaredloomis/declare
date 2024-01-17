import { gql } from '@apollo/client';

export function testStepDescription(step: any): string {
  return {
    click: 'Click',
  }[step.stepType as string]!;
}

export const CORE_TEST_FIELDS = gql`
  fragment CoreTestFields on Test {
    id
    name
    steps {
      ... on GoToStep {
        stepType
        url
      }
      ... on WaitStep {
        stepType
        milliseconds
      }
      ... on ClickStep {
        stepType
        elementId
      }
      ... on SendTextStep {
        stepType
        elementId
        text
      }
      ... on AssertExistsStep {
        stepType
        elementId
        visible
      }
      ... on ExecuteJavascriptStep {
        stepType
        code
      }
      ... on RefreshStep {
        stepType
      }
      ... on AssertTextStep {
        stepType
        elementId
        text
      }
      ... on SetVariableStep {
        stepType
        name
        value {
          ... on SetVariableString {
            string
          }
          ... on SetVariableElement {
            elementId
          }
          ... on SetVariableJavascript {
            code
          }
        }
      }
      ... on ImportTestStep {
        stepType
        testId
      }
    }
  }
`;

export const TEST_QUERY = gql`
  ${CORE_TEST_FIELDS}
  query GetTest($id: Int!) {
    test(id: $id) {
      ...CoreTestFields
      collectionId
      reports {
        id
        testId
        startTime
      }
    }
  }
`;

export const TESTS_QUERY = gql`
  query Tests {
    account {
      id
      tests {
        id
        name
      }
    }
  }
`;

export const COLLECTIONS_QUERY = gql`
  query Collections {
    account {
      id
      collections {
        id
        name
        tests {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollection($collection: CollectionCreateInput!) {
    createCollection(collection: $collection) {
      id
    }
  }
`;
