import { gql } from "@apollo/client";

export function testStepDescription(step: any): string {
  return {
    'click': 'Click',
  }[step.stepType as string]!;
}

export const TEST_QUERY = gql`
query GetTest ($id: Int!) {
  test(id: $id) {
    id name
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
    reports {
      id testId startTime
    }
  }
}`;
