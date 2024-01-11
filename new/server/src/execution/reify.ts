import { convertObj } from "../adapter";
import { prisma } from "../schema";
import { Element as ElementAdapter, Test as TestAdapter } from "../adapter";
import { Test, TestStep, Element } from "../generated/graphql";

export interface ReifiedTestStep extends Omit<TestStep, 'args'> {
  args: ReifiedTestStepArguments;
}

export interface ReifiedTestStepArguments extends Omit<Omit<TestStep, 'elementId'>, 'testId'> {
  element?: Element;
  test?: Test;
}

export async function reifyTestSteps(steps: TestStep[]): Promise<ReifiedTestStep[]> {
  // Fetch all elements used in test
  const elementIds = steps
    .map((step: TestStep) => (step as any).elementId || (step as any).value?.elementId )
    .filter(elementId => !!elementId);
  const elements: Element[] = await prisma.element.findMany({
    where: {
      id: {
        in: elementIds,
      },
    }
  }).then(elements =>
    elements.map(element => convertObj(element, ElementAdapter))
  );

  // Fetch all tests used in test
  // TODO allow nested imports
  const testIds = steps
    .map((step: TestStep) => (step as any).testId)
    .filter(testId => !!testId);
  const tests: Test[] = await prisma.test.findMany({
    where: {
      id: {
        in: testIds,
      },
    }
  }).then(tests =>
    tests.map(test => convertObj(test, TestAdapter))
  );

  // Reify elementId -> element, testId -> test, etc.
  const reifiedSteps: ReifiedTestStep[] = steps.map((step: TestStep) => {
    if((step as any).elementId) {
      (step as any).element = elements.find(element => element.id === (step as any).elementId);
      (step as any).elementId = undefined;
    } else if((step as any).value?.elementId) {
      (step as any).value.element = elements.find(element => element.id === (step as any).value.elementId);
      (step as any).value.elementId = undefined;
    }

    if((step as any).testId) {
      (step as any).test = tests.find(test => test.id === (step as any).testId);
      (step as any).testId = undefined;
    }
    return step as unknown as ReifiedTestStep;
  });

  return reifiedSteps;
}
