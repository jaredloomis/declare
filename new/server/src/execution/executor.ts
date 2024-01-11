import { Report, Test, TestStepResult } from "../generated/graphql";
import { TestEngine } from "./engine";
import { ReifiedTestStep, reifyTestSteps } from "./reify";

interface TestExecutor {
  executeTest: (test: Test) => Promise<Report>;
}

interface TestExecutorOptions {
  // TODO saveScreenshotCount?: number;
  // TODO subprocess?: boolean;
}

/**
 * Executes tests on the same machine as the server.
 */
export class LocalTestExecutor implements TestExecutor {
  engine: TestEngine;
  options: TestExecutorOptions;

  constructor(engine: TestEngine, options?: TestExecutorOptions) {
    this.engine = engine;
    this.options = options || {};
  }

  async executeTest(test: Test): Promise<Report> {
    // Reify elementId -> element
    const reifiedSteps: ReifiedTestStep[] = await reifyTestSteps(test.steps)

    // Execute test
    const startTime = new Date();
    const stepResults: TestStepResult[] = [];
    for (const step of reifiedSteps) {
      const startTime = new Date();
      try {
        (this.engine as any)[step.stepType](step.args);
        const screenshot = await this.engine.screenshot();
        stepResults.push({
          status: "pass",
          startTime,
          endTime: new Date(),
          screenshot,
        });
      } catch (e: any) {
        const screenshot = await this.engine.screenshot();
        stepResults.push({
          status: "fail",
          error: e.message,
          startTime,
          endTime: new Date(),
          screenshot,
        });
      }
    }

    // Remove screenshots if there are too many

    // Return report
    const endTime = new Date();
    return {
      id: -1,
      testId: test.id,
      status: "pass",
      startTime,
      endTime,
      duration: endTime.getTime() - startTime.getTime(),
      stepResults,
    };
  }
}
