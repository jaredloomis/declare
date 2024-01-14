import { convertObj } from './adapter';
import { Element as ElementAdapter, Test as TestAdapter } from './adapter';
import { Test, TestStep, Element } from './generated/graphql';

export interface ReifiedTestStep extends Omit<TestStep, 'args'> {
  args: ReifiedTestStepArguments;
}

export interface ReifiedTestStepArguments extends Omit<Omit<TestStep, 'elementId'>, 'testId'> {
  element?: Element;
  test?: Test;
}

export interface ReifiedTest extends Omit<Test, 'steps'> {
  steps: ReifiedTestStep[];
}
