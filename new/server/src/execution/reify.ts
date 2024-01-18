import { convertObj, Element as ElementAdapter, Test as TestAdapter } from 'declare-server-common/src/adapter';
import { prisma } from '../client';
import { Test, TestStep, Element, Report } from '../generated/graphql';
import { ReifiedTest } from 'declare-server-common/src/reified-test';

export interface ReifiedTestStep extends Omit<TestStep, 'args'> {
  args: ReifiedTestStepArguments;
}

export interface ReifiedTestStepArguments extends Omit<Omit<TestStep, 'elementId'>, 'testId'> {
  element?: Element;
  test?: Test;
}

const MAX_IMPORT_DEPTH = 10;

export async function reifyTestSteps(steps: TestStep[], seenTestIds: number[] = []): Promise<ReifiedTestStep[]> {
  if (seenTestIds.length > MAX_IMPORT_DEPTH) {
    throw new Error('Depth of imports exceeds maximum of 10');
  }

  // Fetch all elements used in test
  const elementIds = steps
    .map((step: TestStep) => (step as any).elementId || (step as any).value?.elementId)
    .filter(elementId => !!elementId);
  const elements: Element[] = await prisma.element
    .findMany({
      where: {
        id: {
          in: elementIds,
        },
      },
    })
    .then((elements: any[]) => elements.map((element: any) => convertObj(element, ElementAdapter)));

  // Fetch all tests used in test
  const testIds = steps.map((step: TestStep) => (step as any).testId).filter(testId => !!testId);

  if (intersection(seenTestIds, testIds).length > 0) {
    throw new Error('Circular import detected');
  }

  const tests: ReifiedTest[] = await prisma.test
    .findMany({
      where: {
        id: {
          in: testIds,
        },
      },
    })
    .then((tests: any[]) => tests.map((test: any) => convertObj(test, TestAdapter)))
    .then((tests: any[]) =>
      Promise.all(
        tests.map((test: Test) => {
          return reifyTest(test, seenTestIds.concat([test.id]));
        })
      )
    );

  // Reify elementId -> element, testId -> test, etc.
  const reifiedSteps: ReifiedTestStep[] = steps.map((step: TestStep) => {
    if ((step as any).elementId) {
      (step as any).element = elements.find(element => element.id === (step as any).elementId);
      (step as any).elementId = undefined;
    } else if ((step as any).value?.elementId) {
      (step as any).value.element = elements.find(element => element.id === (step as any).value.elementId);
      (step as any).value.elementId = undefined;
    }

    if ((step as any).testId) {
      (step as any).test = tests.find(test => test.id === (step as any).testId);
      (step as any).testId = undefined;
    }
    return step as unknown as ReifiedTestStep;
  });

  return reifiedSteps;
}

export async function reifyTest(test: Test, seenTestIds: number[] = []): Promise<ReifiedTest> {
  return {
    ...test,
    steps: await reifyTestSteps(test.steps, seenTestIds),
  };
}

function intersection<T>(a: T[], b: T[]): T[] {
  let t;
  if (b.length > a.length) (t = b), (b = a), (a = t);
  return a
    .filter(function (e) {
      return b.indexOf(e) > -1;
    })
    .filter(function (e, i, c) {
      return c.indexOf(e) === i;
    });
}
