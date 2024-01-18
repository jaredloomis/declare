import { Test } from '../generated/graphql';
import { reifyTest } from './reify';
import { TEST_EXECUTION_CHANNEL, TestExecutionMessage, publish } from 'declare-server-common/src/pubsub';
import { ReifiedTest } from 'declare-server-common/src/reified-test';

interface TestExecutionDelegator {
  executeTest: (test: Test) => Promise<void>;
}

interface TestExecutionDelegatorOptions {}

/**
 * Delegate to the PubSub (currently redis).
 */
export class PubSubTestExecutionDelegator implements TestExecutionDelegator {
  options: TestExecutionDelegatorOptions;

  constructor(options?: TestExecutionDelegatorOptions) {
    this.options = options || {};
  }

  async executeTest(test: Test): Promise<void> {
    const reifiedTest: ReifiedTest = await reifyTest(test);
    await publish<TestExecutionMessage>(TEST_EXECUTION_CHANNEL, {
      test: reifiedTest,
    });
  }
}
