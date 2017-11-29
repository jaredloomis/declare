// @flow
import webdriver, {By} from "selenium-webdriver"

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
        options = options || {}
        super(options)
        this.driver = new webdriver.Builder()
            .forBrowser(options.browser || "chrome")
            .build()
    }

    quit(): Promise<void> {
        return this.driver.quit()
    }

    get(url: string): Promise<void> {
        return this.driver.get(url)
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

    find(selector: Selector): Promise<Elem> {
        return this.driver.findElement(this.toBy(selector))
    }

    executeScript(script: string, ...args: Array<any>): Promise<any> {
        return this.driver.executeScript(script, args)
    }

    toBy(element: Selector): By {
        if(element.xpath) {
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
