import webdriver, { By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import Handlebars from 'handlebars';
import {
  AssertExistsStep,
  AssertTextStep,
  ClickStep,
  Element,
  ExecuteJavascriptStep,
  GoToStep,
  ImportTestStep,
  SendTextStep,
  SetVariableElement,
  SetVariableJavascript,
  SetVariableStep,
  SetVariableString,
  Test,
  TestStepStatus,
} from './generated/graphql';
import { ReifiedTest, ReifiedTestStep } from 'server-common/src/reified-test';
import { TestStepResult } from './generated/graphql';

export class TestExecutionFailure extends Error {}
export class TestExecutionError extends Error {}

export class ElementNotFoundFailure extends TestExecutionFailure {
  constructor(element: Element) {
    super(`Element not found: '${showElement(element)}'`);
  }
}

export class JavascriptFailure extends TestExecutionFailure {
  constructor(message: string, error: Error | undefined = undefined) {
    super(`'${message} (${error?.message || ''})'`);
  }
}

export class AssertionFailure extends TestExecutionFailure {
  constructor(message: string) {
    super(`Assertion failed: '${message}'`);
  }
}

interface ClickArgs extends Omit<ClickStep, 'elementId'> {
  element: Element;
}

interface SendTextArgs extends Omit<SendTextStep, 'elementId'> {
  element: Element;
}

interface AssertExistsArgs extends Omit<AssertExistsStep, 'elementId'> {
  element: Element;
}

interface AssertTextArgs extends Omit<AssertTextStep, 'elementId'> {
  element: Element;
}

interface SetVariableArgs extends Omit<SetVariableStep, 'value'> {
  value: SetVariableValueArgs;
}

type SetVariableValueArgs = SetVariableString | SetVariableJavascript | SetVariableElementArgs;

interface SetVariableElementArgs extends Omit<SetVariableElement, 'elementId'> {
  element: Element;
}

interface ImportTestArgs extends Omit<ImportTestStep, 'testId'> {
  test: ReifiedTest;
}

function toBy(element: Element): By {
  switch (element.selectorType) {
    case 'css':
      return By.css(element.selector);
    case 'xpath':
      return By.xpath(element.selector);
  }

  throw new Error(`Unknown selector type ${element.selectorType}`);
}

export abstract class TestEngine {
  variables: Record<string, any> = {};

  abstract init(): AsyncGenerator<TestStepResult>;
  abstract executeStep(step: ReifiedTestStep): AsyncGenerator<TestStepResult>;
  abstract goTo(args: GoToStep): AsyncGenerator<TestStepResult>;
  abstract click(args: ClickArgs): AsyncGenerator<TestStepResult>;
  abstract sendText(args: SendTextArgs): AsyncGenerator<TestStepResult>;
  abstract executeJavascript(args: ExecuteJavascriptStep): AsyncGenerator<TestStepResult>;
  abstract assertExists(args: AssertExistsArgs): AsyncGenerator<TestStepResult>;
  abstract assertText(args: AssertTextArgs): AsyncGenerator<TestStepResult>;
  abstract setVariable(args: SetVariableArgs): AsyncGenerator<TestStepResult>;
  abstract importTest(args: ImportTestArgs): AsyncGenerator<TestStepResult>;
  abstract screenshot(): Promise<string>;
}

export class SeleniumEngine extends TestEngine {
  driver!: webdriver.WebDriver;

  async *init() {
    let builder = new webdriver.Builder();

    if (process.env.NODE_ENV === 'production') {
      builder = builder.setChromeOptions(new chrome.Options().headless());
    }

    this.driver = builder.forBrowser('chrome').build();
    await this.driver.manage().setTimeouts({ implicit: 1000 });
  }

  executeStep(step: ReifiedTestStep): AsyncGenerator<TestStepResult> {
    return (this as any)[step.stepType](step.args);
  }

  async screenshot(): Promise<string> {
    return await this.driver.takeScreenshot();
  }

  goTo = ({ url }: GoToStep) =>
    this.wrapException(`Navigate to <code>${url}</code>`, '', async function* (self: SeleniumEngine) {
      url = self.processStr(url);
      await self.driver.get(url);
    });

  click = ({ element }: ClickArgs) =>
    this.wrapException(`Click <code>${showElement(element)}</code>`, '', async function* (self: SeleniumEngine) {
      element.selector = self.processStr(element.selector);
      const wdElement = await self.driver.findElement(toBy(element));
      await wdElement.click();
    });

  sendText = ({ element, text }: SendTextArgs) =>
    this.wrapException(
      `Assign value <code>${text}</code> to <code>${showElement(element)}</code>`,
      '',
      async function* (self: SeleniumEngine) {
        text = self.processStr(text);
        element.selector = self.processStr(element.selector);
        const wdElement = await self.driver.findElement(toBy(element));
        await wdElement.sendKeys(text);
      }
    );

  executeJavascript = ({ code }: ExecuteJavascriptStep) =>
    this.wrapException(`Execute JavaScript <code>${code}</code>`, '', async function* (self: SeleniumEngine) {
      code = self.processStr(code);
      try {
        await self.driver.executeScript(code);
      } catch (e: any) {
        throw new JavascriptFailure('Failed to execute JavaScript', e);
      }
    });

  assertExists = ({ element }: AssertExistsArgs) =>
    this.wrapException(
      `Assert Element Exists <code>${showElement(element)}</code>`,
      '',
      async function* (self: SeleniumEngine) {
        element.selector = self.processStr(element.selector);
        try {
          await self.driver.findElement(toBy(element));
        } catch (e) {
          throw new AssertionFailure(`Element not found: ${showElement(element)}`);
        }
      }
    );

  assertText = ({ element, text }: AssertTextArgs) =>
    this.wrapException(
      `Assert Element Exists <code>${showElement(element)}</code>`,
      '',
      async function* (self: SeleniumEngine) {
        text = self.processStr(text);
        element.selector = self.processStr(element.selector);
        let wdElem;
        try {
          wdElem = await self.driver.findElement(toBy(element));
        } catch (e) {
          throw new AssertionFailure(`Element not found: ${showElement(element)}`);
        }
        self.assert((await wdElem.getText()) === text);
      }
    );

  setVariable = ({ name, value }: SetVariableArgs) =>
    this.wrapException(
      `Set variable <code>${name}</code> to <code>${value}</code>`,
      '',
      async function* (self: SeleniumEngine) {
        const anyVal = value as any;
        if (anyVal.string) {
          self.variables[name] = self.processStr(anyVal);
        } else if (anyVal.code) {
          try {
            self.variables[name] = await self.driver.executeScript<any>(anyVal.code);
          } catch (e: any) {
            throw new JavascriptFailure('Failed to execute JavaScript', e);
          }
        } else if (anyVal.element) {
          const element = anyVal.element as any;
          element.selector = self.processStr(element.selector);
          try {
            const wdElem = await self.driver.findElement(toBy(element));
            self.variables[name] = await wdElem.getText();
          } catch (e) {
            throw new ElementNotFoundFailure(element);
          }
        }
      }
    );

  async *importTest({ test }: ImportTestArgs): AsyncGenerator<TestStepResult> {
    for (const step of test.steps) {
      yield* this.executeStep(step);
    }
  }

  private async *wrapException(
    passMsg: string,
    failMsgPrefix: string,
    generatorFn: (self: SeleniumEngine) => AsyncGenerator<TestStepResult>
  ): AsyncGenerator<TestStepResult> {
    try {
      yield* generatorFn(this);
      yield {
        status: TestStepStatus.Pass,
        message: passMsg,
        endTime: new Date(),
        screenshot: await this.screenshot(),
      };
    } catch (e: any) {
      yield {
        status: e instanceof TestExecutionFailure ? TestStepStatus.Fail : TestStepStatus.Error,
        message: failMsgPrefix + e.message,
        endTime: new Date(),
        screenshot: await this.screenshot(),
      };
    }
  }

  private assert(condition: boolean): void {
    if (!condition) {
      throw new AssertionFailure('Assertion failed');
    }
  }

  private processStr(str: string): string {
    return Handlebars.compile(str)(this.variables);
  }
}

function showElement(element: Element) {
  return `<code>${element.selectorType}:${element.selector}</code>`;
}
