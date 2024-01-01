import { Report, Test } from "../generated/graphql";
import { TestEngine } from "./engine";

interface TestExecutor {
  executeTest: (test: Test) => Promise<Report>;
}

export class LocalTestExecutor implements TestExecutor {
  engine: TestEngine;

  constructor(engine: TestEngine) {
    this.engine = engine;
  }

  async executeTest(test: Test): Promise<Report> {
    const startTime = new Date();
    const stepResults = [];
    for (const step of test.steps) {
      try {
        (this.engine as any)[step.type](step.args);
        const screenshot = this.engine.screenshot();
        stepResults.push({
          status: "pass",
          endTime: new Date(),
          screenshot,
        });
      } catch (e: any) {
        const screenshot = this.engine.screenshot();
        stepResults.push({
          status: "fail",
          error: e.message,
          endTime: new Date(),
          screenshot,
        });
      }
    }
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
