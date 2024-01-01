import webdriver, { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export class ElementNotFoundError extends Error {
  constructor(selector: string) {
    super(`${selector} not found}`);
  }
}

export interface TestEngine {
  init(): Promise<void>;
  goTo({ url }: { url: string }): Promise<void>;
  click({ selector }: { selector: string }): Promise<void>;
  sendText({
    selector,
    text,
  }: {
    selector: string;
    text: string;
  }): Promise<void>;
  executeScript({ script }: { script: string }): Promise<any>;
  assertElementExists({ selector }: { selector: string }): Promise<void>;
  screenshot(): Promise<string>;
}

export class SeleniumEngine implements TestEngine {
  driver!: webdriver.WebDriver;

  async init() {
    let builder = new webdriver.Builder();

    if (process.env.NODE_ENV === "production") {
      builder = builder.setChromeOptions(new chrome.Options().headless());
    }

    this.driver = builder.forBrowser("chrome").build();
    await this.driver.manage().setTimeouts({ implicit: 1000 });
  }

  screenshot(): Promise<string> {
    return this.driver.takeScreenshot();
  }

  async goTo({ url }: { url: string }) {
    await this.driver.get(url);
  }

  async click({ selector }: { selector: string }) {
    const element = await this.driver.findElement(webdriver.By.css(selector));
    await element.click();
  }

  async sendText({ selector, text }: { selector: string; text: string }) {
    const element = await this.driver.findElement(webdriver.By.css(selector));
    await element.sendKeys(text);
  }

  async executeScript({ script }: { script: string }) {
    return await this.driver.executeScript(script);
  }

  async assertElementExists({ selector }: { selector: string }) {
    try {
      await this.driver.findElement(webdriver.By.css(selector));
    } catch (e) {
      throw new ElementNotFoundError(selector);
    }
  }
}
