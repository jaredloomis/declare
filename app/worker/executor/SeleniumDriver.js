// @flow
import webdriver, {By, until} from "selenium-webdriver"
import chrome from "selenium-webdriver/chrome"

import      Driver                   from "./Driver"
import type {DriverI, DriverOptions} from "./Driver"
import type {Selector}               from "./Selector"
import Report, {Status, Step}   from "./Report"
import type {StatusLabel}            from "./Report"

// Use async/await instead of promise manager
webdriver.promise.USE_PROMISE_MANAGER = false

// TODO: constrain
type Elem = any
type RawDriver = any

export default class SeleniumDriver extends Driver {
    driver: RawDriver

    constructor(options: ?DriverOptions) {
        const defaultOptions = {
            browser: "chrome",
            timeout: 5 * 1000
        }
        options = Object.assign({}, defaultOptions, options)
        super(options)

        this.driver = new webdriver.Builder()
            .forBrowser(options.browser)
            .setChromeOptions(new chrome.Options()
                .headless()
                .addArguments("--no-sandbox")
                .addArguments("--disable-dev-shm-usage")
                .addArguments("--disable-software-rasterizer"))
            .build()
    }

    quit(): Promise<void> {
        return this.driver.quit()
    }

    async get(url: string): Promise<void> {
        await this.driver.get(url)
        return this.wait(until.urlContains(url))
    }

    async click(selector: Selector): Promise<void> {
        const elem = await this.find(selector)
        await elem.click()
    }

    async exists(element: Selector): Promise<boolean> {
        try {
            await this.find(element)
            return true
        } catch(ex) {
            return false
        }
    }

    async setValue(selector: Selector, value: string) {
        const elem = await this.find(selector)
        await elem.clear()
        await elem.sendKeys(value)
    }

    async screenshot(): Promise<Buffer> {
        return new Buffer(await this.driver.takeScreenshot(), "base64")
    }

    async getText(selector: Selector): Promise<string> {
        return (await this.find(selector)).getText()
    }

    async getTextAll(selector: Selector): Promise<Array<string>> {
        const ret = []
        const elems = await this.findAll(selector)
        for(let i = 0; i < elems.length; ++i) {
            ret.push(await elems[i].getText())
        }
        return ret
    }

    async find(selector: Selector): Promise<Elem> {
        /*const elemBy = this.toBy(selector)
        await this.wait(until.elementLocated(elemBy))
        return this.driver.findElement(elemBy)*/
        const elems = await this.findAll(selector)
        for(const elem of elems) {
            if(await elem.isDisplayed()) {
                return elem
            }
        }
        return elems[0]
    }

    async findAll(selector: Selector): Promise<Array<Elem>> {
        const elemBy = this.toBy(selector)
        await this.wait(until.elementLocated(elemBy))
        return this.driver.findElements(elemBy)
    }

    executeScript(script: string, ...args: Array<any>): Promise<any> {
        return this.driver.executeScript(script, args)
    }

    wait(condition: any, message: string, timeout: ?number): Promise<any> {
        return this.driver.wait(condition, timeout || this.options.timeout, message)
    }

    toBy(element: Selector): By {
        if(!element) {
            return null
        } else if(element.xpath) {
            return By.xpath(element.xpath)
        } else if(element.css) {
            return By.css(element.css)
        } else if(typeof(element) === "string") {
            return By.css(element)
        }
    }
}

// Ensure SeleniumDriver is a DriverI
function test(): DriverI {
    return new SeleniumDriver({})
}
