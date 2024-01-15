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
      ... on ClickStep {
        stepType
        elementId
      }
      ... on SendTextStep {
        stepType
        elementId
        text
      }
    }
  }
`;

export const TEST_QUERY = gql`
  ${CORE_TEST_FIELDS}
  query GetTest($id: Int!) {
    test(id: $id) {
      ...CoreTestFields
      reports {
        id
        testId
        startTime
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
