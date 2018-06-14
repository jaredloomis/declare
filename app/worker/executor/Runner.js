// @flow
import type {DriverI}         from "./Driver"
import type {Selector}        from "./Selector"
import Report, {Step, Status} from "./Report"
import type {StatusLabel}     from "./Report"
import {storeAsset}           from "../../access/Asset"
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
        const defaultOptions = {
            delay: 500
        }
        this.options   = Object.assign({}, defaultOptions, options)

        this.driver    = driver
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
        url = this.expandVariables(url)

        try {
            await this.driver.get(url)
            await this.log(Status.PASS, `Go to url "${url}"`)
        } catch(ex) {
            await this.log(Status.FAIL, `Couldn't go to url "${url}"`)
        }
    }

    async sleep(millis: number): Promise<void> {
        await this.log(Status.INFO, `Sleep for ${millis}ms`)
        return new Promise((resolve, reject) => {
            setTimeout(resolve, millis)
        })
    }

    async click(element: Selector) {
        try {
            await this.driver.click(element)
            await this.log(Status.PASS, `Click ${showSelector(element)}`)
        } catch(ex) {
            await this.log(Status.FAIL, `Click ${showSelector(element)}`)
        }
    }

    async exists(element: Selector) {
        try {
            const ret = await this.driver.exists(element)
            await this.log(
                Status.PASS,
                `Check if ${showSelector(element)} exists: ${ret.toString()}`
            )
            return ret
        } catch(ex) {
            await this.log(
                Status.FAIL,
                `Couldn't check if ${showSelector(element)} exists`
            )
        }
    }

    async setValue(selector: Selector, value: string) {
        value = this.expandVariables(value)

        try {
            await this.driver.setValue(selector, value)
            await this.log(
                Status.PASS,
                `Set value of "${showSelector(selector)}" to ${value}`
            )
        } catch(ex) {
            await this.log(
                Status.FAIL,
                `Couldn't set value of "${showSelector(selector)}" to ${value}`,
                {ex}
            )
        }
    }

    async screenshot() {
        const screenshot = await this.driver.screenshot()
        const key = `${new Date().toString()}.png`
        await storeAsset(key, screenshot, {
            ContentEncoding: "base64",
            ContentType: "image/png"
        })
        //await this.log(Status.INFO, "Take a screenshot", {screenshot})
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
            await this.log(
                Status.PASS,
                `Get text from "${showSelector(selector)}": "${text}"`
            )
            return text
        } catch(ex) {
            await this.log(
                Status.FAIL,
                `Couldn't get text from "${showSelector(selector)}"`,
                {ex}
            )
            return ""
        }
    }

    async getTextAll(selector: Selector): Promise<Array<string>> {
        try {
            const text = await this.driver.getTextAll(selector)
            await this.log(
                Status.PASS,
                `Get text from "${showSelector(selector)}": "${text}"`
            )
            return text
        } catch(ex) {
            await this.log(
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
            const filledScript = this.expandVariables(script)
            const ret = await this.driver.executeScript(filledScript, ...args)
            await this.log(
                Status.PASS,
                `Execute script "${script}", returned ${ret}`,
                {script, args}
            )
            return ret
        } catch(ex) {
            await this.log(
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

    /**
     * Navigate to a root page (a page directly accessible from URL).
     * If target is present, it will navigate to a root that is connected
     * to target (i.e. it is possible to get from root to target)
     */
    async navigateToRoot(target: ?string): Promise<void> {
        const roots = await this.navigator.findRoots(target)

        if(roots.length) {
            await this.get(roots[0].startURL)
            this.navigator.setPage(roots[0]._id.toString())
        } else {
            throw {
                message: "No connected roots present in page graph."
            }
        }
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

    expandVariables(str: string): string {
        // Collect all the occurances of variables

        const regex = /\{\{(\s*[a-zA-Z_][a-zA-Z0-9_]*\s*)\}\}/g
        const matches = []
        let   match

        do {
            match = regex.exec(str)
            if(match) {
                matches.push(match[1])
            }
        } while(match)

        // Replace each occurance with corresponding value

        for(match of matches) {
            const name  = match.trim()
            const value = this.getVariable(name)
            str = str.replace(`{{${match}}}`, value || "")
        }

        return str
    }

    getVariable(name: string): ?any {
        return this.variables[name]
    }

    setVariable(name: string, value: any): void {
        this.variables[name] = value
        this.logRaw(
            Status.INFO,
            `Set variable "${name}" to "${value}"`
        )
    }

    /**
     * Import all variables from environment.
     */
    importEnvironment(environment: any) {
        for(const {identifier, value} of environment.variables) {
            this.variables[identifier] = value
        }
    }

    /*
     * Reporting
     */

    assert(condition: boolean, trueMsg: string, falseMsg: ?string, data: ?any) {
        const status  = condition ? Status.PASS : Status.FAIL
        const message = !falseMsg ? trueMsg : (condition ? trueMsg : falseMsg)
        this.report.log(new Step("runner", status, message, data))
    }

    async log(status: StatusLabel, message: string, data: ?any) {
        this.logRaw(status, message, {
            ...(data || {}),
            screenshot: await this.screenshotKey()
        })
    }

    logRaw(status: StatusLabel, message: string, data: ?any) {
        this.report.log(new Step("runner", status, message, data))
    }

    beginLogRegion(message: string, data: ?any) {
        const step = new Step("runner", Status.INFO, message, data)
        this.report.beginLogRegion(step)
    }

    endLogRegion() {
        this.report.endLogRegion()
    }

    failed(): boolean {
        return this.report.failed()
    }
}
