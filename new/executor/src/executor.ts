import { Report, TestStepResult, TestStepStatus } from './generated/graphql';
import { SeleniumEngine, TestEngine, TestExecutionFailure } from './engine';
import { ReifiedTest } from 'server-common/src/reified-test';

interface TestExecutor {
  executeTest: (test: ReifiedTest) => Promise<Report>;
}

interface TestExecutorOptions {
  // TODO saveScreenshotCount?: number;
}

/**
 * Executes tests on the same machine as the server.
 */
export class LocalTestExecutor implements TestExecutor {
  engine: TestEngine;
  options: TestExecutorOptions;

  constructor(options?: TestExecutorOptions) {
    this.engine = new SeleniumEngine();
    this.options = options || {};
  }

  async executeTest(test: ReifiedTest): Promise<Report> {
    // Execute test
    const startTime = new Date();
    const stepResults: TestStepResult[] = [];
    for (const step of test.steps) {
      try {
        const stepGenerator = this.engine.executeStep(step);
        await collectAsyncGenerator(stepGenerator, stepResults.push);
      } catch (e: any) {
        console.error(e);
        let screenshot = undefined;
        try {
          screenshot = await this.engine.screenshot();
        } catch (e: any) {}

        stepResults.push({
          status: e instanceof TestExecutionFailure ? TestStepStatus.Fail : TestStepStatus.Error,
          message: e.message,
          endTime: new Date(),
          screenshot,
        });
      }
    }

    // TODO Remove screenshots if there are too many

    // Return report
    const endTime = new Date();
    return {
      id: undefined as unknown as number,
      testId: test.id,
      status: stepResults[-1]?.status || TestStepStatus.None,
      startTime,
      endTime,
      stepResults,
    };
  }
}

async function collectAsyncGenerator<T, V>(generator: AsyncGenerator<T, V>, f: (val: T) => void): Promise<V> {
  let result = await generator.next();
  while (!result.done) {
    f(result.value);
    result = await generator.next();
  }
  return result.value;
}
