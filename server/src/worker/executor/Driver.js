// @flow

import type {Selector} from "./Selector"

export type DriverI = {
    quit(): Promise<void>,
    screenshot(): Promise<Buffer>,
    get(url: string): Promise<void>,
    click(element: Selector): Promise<void>,
    exists(element: Selector): Promise<boolean>,
    setValue(element: Selector, value: any): Promise<void>,
    executeScript(script: string): Promise<any>,
    getText(element: Selector): Promise<string>
}

export type DriverOptions = {}

export default class Driver {
    options: DriverOptions

    constructor(options: ?DriverOptions) {
        this.options = options || {}
    }
}
