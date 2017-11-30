// @flow
import type {DriverI}         from "./Driver"
import type {Selector}        from "./Selector"
import Report, {Step, Status} from "./Report"
import type {StatusLabel}     from "./Report"
import {uploadFile}           from "./AssetStorage"
import Navigator              from "./Navigator"
import {showSelector}         from "./Selector"

export type RunnerOptions = {}
export type Screenshot = {|key: string, raw: Buffer|}

/**
 * A wrapper over a Driver - handles reporting, sessions,
 * anything that is the same over all Drivers
 */
export default class Runner {
    driver: DriverI
    options: RunnerOptions
    report: Report
    navigator: Navigator
    variables: {[string]: any}

    constructor(driver: DriverI, repName: string, options: ?RunnerOptions) {
        this.driver    = driver
        this.options   = options || {}
        this.report    = new Report(repName)
        this.navigator = new Navigator(this)
        this.variables = {}
    }

    /*
     * Instance management
     */

    initNavigator(): Promise<void> {
        return this.navigator.init()
    }

    quit(): Promise<void> {
        // XXX Might want to reset variables between runs. Security?
        // this.variables = {}
        return this.driver.quit()
    }

    /*
     * Testing Actions
     */

    async get(url: string) {
        try {
            await this.driver.get(url)
            this.log(Status.PASS, `Go to url "${url}"`)
        } catch(ex) {
            this.log(Status.FAIL, `Couldn't go to url "${url}"`)
        }
    }

    sleep(millis: number): Promise<void> {
        this.log(Status.INFO, `Sleep for ${millis}ms`)
        return new Promise((resolve, reject) => {
            setTimeout(resolve, millis)
        })
    }

    async click(element: Selector) {
        try {
            await this.driver.click(element)
            this.log(Status.PASS, `Click ${showSelector(element)}`, {
                screenshot: await this.screenshotKey()
            })
        } catch(ex) {
            this.log(Status.FAIL, `Click ${showSelector(element)}`, {
                screenshot: await this.screenshotKey()
            })
        }
    }

    async exists(element: Selector) {
        try {
            const ret = await this.driver.exists(element)
            this.log(
                Status.PASS,
                `Check if ${showSelector(element)} exists: ${ret.toString()}`
            )
            return ret
        } catch(ex) {
            this.log(
                Status.FAIL,
                `Couldn't check if ${showSelector(element)} exists`
            )
        }
    }

    async setValue(selector: Selector, value: string) {
        try {
            await this.driver.setValue(selector, value)
            this.log(
                Status.PASS,
                `Set value of "${showSelector(selector)}" to ${value}`
            )
        } catch(ex) {
            this.log(
                Status.FAIL,
                `Couldn't set value of "${showSelector(selector)}" to ${value}`,
                {ex}
            )
        }
    }

    async screenshot() {
        const screenshot = await this.driver.screenshot()
        const key = `${new Date().toString()}.png`
        await uploadFile(key, screenshot, {
            ContentEncoding: "base64",
            ContentType: "image/png"
        })
        this.log(Status.INFO, "Take a screenshot", {screenshot})
        return {key, raw: screenshot}
    }

    async screenshotKey() {
        return (await this.screenshot()).key
    }

    /*
     * Getting values from page
     */

    async getText(selector: Selector): Promise<string> {
        try {
            const text = await this.driver.getText(selector)
            this.log(
                Status.PASS,
                `Get text from "${showSelector(selector)}": "${text}"`
            )
            return text
        } catch(ex) {
            this.log(
                Status.FAIL,
                `Couldn't get text from "${showSelector(selector)}"`,
                {ex}
            )
            return ""
        }
    }

    /*
     * JavaScript Execution
     */

    async executeScript(script: string, ...args: Array<any>): Promise<any> {
        try {
            const filledScript = this.fillInVariables(script, this.variables)
            const ret = await this.driver.executeScript(filledScript, ...args)
            this.log(
                Status.PASS,
                `Execute script "${script}", returned ${ret}`,
                {script, args}
            )
            return ret
        } catch(ex) {
            this.log(
                Status.FAIL,
                `Ran into trouble executing script "${script}"`,
                {ex, script, args}
            )
        }
    }

    /*
     * Navigation
     */

    navigateTo(pageID: string): Promise<void> {
        return this.navigator.navigateTo(pageID)
    }

    inferCurrentPage(): Promise<void> {
        return this.navigator.inferCurrentPage()
    }

    setPage(pageID: string) {
        this.navigator.setPage(pageID)
    }

    /*
     * Variables
     */

    getVariables(name: string): ?any {
        return this.variables[name]
    }

    setVariable(name: string, value: any): void {
        this.variables[name] = value
        this.log(
            Status.INFO,
            `Set variable "${name}" to "${value}"`
        )
    }

    /*
     * Logging
     */

    assert(condition: boolean, trueMsg: string, falseMsg: ?string, data: ?any) {
        const status  = condition ? Status.PASS : Status.FAIL
        const message = !falseMsg ? trueMsg : (condition ? trueMsg : falseMsg)
        this.report.log(new Step("runner", status, message, data))
    }

    log(status: StatusLabel, message: string, data: ?any) {
        this.report.log(new Step("runner", status, message, data))
    }

    beginLogRegion(message: string, data: ?any) {
        const step = new Step("runner", Status.INFO, message, data)
        this.report.beginLogRegion(step)
    }

    endLogRegion() {
        this.report.endLogRegion()
    }

    // priv
    fillInVariables(text: string, variables: {[string]: any}) {
        for(const varName in variables) {
            text.replace(new RegExp(`{{${varName}}}`, "g"), variables[varName])
        }
        return text
    }
}
