import webdriver, { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import Handlebars from "handlebars";
import { AssertExistsStep, AssertTextStep, ClickStep, Element, ExecuteJavascriptStep, GoToStep, ImportTestStep,SendTextStep, SetVariableElement, SetVariableJavascript, SetVariableStep, SetVariableString, Test } from "../generated/graphql";
import { ReifiedTestStep } from "./reify";

export class ElementNotFoundError extends Error {
  constructor(element: Element) {
    super(`Element not found: '${showElement(element)}'`);
  }
}

export class JavascriptError extends Error {
  constructor(message: string, error: Error | undefined = undefined) {
    super(`'${message} (${error?.message || ""})'`);
  }
}

export class AssertionError extends Error {
  constructor(message: string) {
    super(`Assertion failed: '${message}'`);
  }
}

interface ClickArgs extends Omit<ClickStep, "elementId"> {
  element: Element;
}

interface SendTextArgs extends Omit<SendTextStep, "elementId"> {
  element: Element;
}

interface AssertExistsArgs extends Omit<AssertExistsStep, "elementId"> {
  element: Element;
}

interface AssertTextArgs extends Omit<AssertTextStep, "elementId"> {
  element: Element;
}

interface SetVariableArgs extends Omit<SetVariableStep, "value"> {
  value: SetVariableValueArgs;
}

type SetVariableValueArgs = SetVariableString | SetVariableJavascript | SetVariableElementArgs;

interface SetVariableElementArgs extends Omit<SetVariableElement, "elementId"> {
  element: Element;
}

interface ImportTestArgs extends Omit<ImportTestStep, "testId"> {
  test: Test;
}

function toBy(element: Element): By {
  switch (element.selectorType) {
    case "css":
      return By.css(element.selector);
    case "xpath":
      return By.xpath(element.selector);
  }

  throw new Error(`Unknown selector type ${element.selectorType}`);
}

export interface TestEngine {
  init(): Promise<void>;
  executeStep(steps: ReifiedTestStep): Promise<void>;
  goTo(args: GoToStep): Promise<void>;
  click(args: ClickArgs): Promise<void>;
  sendText(args: SendTextArgs): Promise<void>;
  executeJavascript(args: ExecuteJavascriptStep): Promise<void>;
  assertExists(args: AssertExistsArgs): Promise<void>;
  assertText(args: AssertTextArgs): Promise<void>;
  setVariable(args: SetVariableArgs): Promise<void>;
  importTest(args: ImportTestArgs): Promise<void>;
  screenshot(): Promise<string>;
}

export class SeleniumEngine implements TestEngine {
  driver!: webdriver.WebDriver;
  variables!: Record<string, any>;

  async init() {
    let builder = new webdriver.Builder();

    if (process.env.NODE_ENV === "production") {
      builder = builder.setChromeOptions(new chrome.Options().headless());
    }

    this.driver = builder.forBrowser("chrome").build();
    await this.driver.manage().setTimeouts({ implicit: 1000 });
  }

  async executeStep(steps: ReifiedTestStep): Promise<void> {
    throw new Error("Method not implemented.");
  }

  screenshot(): Promise<string> {
    return this.driver.takeScreenshot();
  }

  async goTo({ url }: GoToStep) {
    url = this.processStr(url);
    await this.driver.get(url);
  }

  async click({ element }: ClickArgs) {
    element.selector = this.processStr(element.selector);
    const wdElement = await this.driver.findElement(toBy(element));
    await wdElement.click();
  }

  async sendText({ element, text }: SendTextArgs) {
    text = this.processStr(text);
    element.selector = this.processStr(element.selector);
    const wdElement = await this.driver.findElement(toBy(element));
    await wdElement.sendKeys(text);
  }

  async executeJavascript({ code }: ExecuteJavascriptStep) {
    code = this.processStr(code);
    try {
      await this.driver.executeScript(code);
    } catch (e: any) {
      throw new JavascriptError('Failed to execute JavaScript', e);
    }
  }

  async assertExists({ element }: AssertExistsArgs): Promise<void> {
    element.selector = this.processStr(element.selector);
    try {
      await this.driver.findElement(toBy(element));
    } catch (e) {
      throw new AssertionError(`Element not found: ${showElement(element)}`);
    }
  }

  async assertText({ element, text }: AssertTextArgs): Promise<void> {
    text = this.processStr(text);
    element.selector = this.processStr(element.selector);
    try {
      const wdElem = await this.driver.findElement(toBy(element));
      this.assert(await wdElem.getText() === text);
    } catch (e) {
      throw new AssertionError(`Element not found: ${showElement(element)}`);
    }
  }

  async setVariable({ name, value }: SetVariableArgs): Promise<void> {
    const anyVal = value as any;
    if(anyVal.string) {
      this.variables[name] = this.processStr(anyVal);
    } else if(anyVal.code) {
      try {
        this.variables[name] = await this.driver.executeScript<any>(anyVal.code);
      } catch (e: any) {
        throw new JavascriptError('Failed to execute JavaScript', e);
      }
    } else if(anyVal.element) {
      const element = anyVal.element as any;
      element.selector = this.processStr(element.selector);
      try {
        const wdElem = await this.driver.findElement(toBy(element));
        this.variables[name] = await wdElem.getText();
      } catch (e) {
        throw new ElementNotFoundError(element);
      }
    }
  }

  async importTest({ test }: ImportTestArgs): Promise<void> {
    //test.
  }

  assert(condition: boolean): void {
    if (!condition) {
      throw new AssertionError("Assertion failed");
    }
  }

  processStr(str: string): string {
    return Handlebars.compile(str)(this.variables);
  }
}

function showElement(element: Element) {
  return `<code>${element.selectorType}:${element.selector}</code>`;
}
