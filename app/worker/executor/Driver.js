// @flow

// TODO remove - TMP not used
import quackQuack from "./Navigator"

import type {Selector} from "./Selector"

export type DriverI = {
    quit(): Promise<void>,
    screenshot(): Promise<Buffer>,
    get(url: string): Promise<void>,
    click(element: Selector): Promise<void>,
    exists(element: Selector): Promise<boolean>,
    setValue(element: Selector, value: any): Promise<void>,
    executeScript(script: string): Promise<any>
}

export type DriverOptions = {}

export default class Driver {
    options: DriverOptions

    constructor(options: ?DriverOptions) {
        this.options = options || {}
    }
}
