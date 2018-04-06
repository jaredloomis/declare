// @flow

export default class Report {
    name: string
    startTime: Date
    steps: Array<Step>

    /**
     * A "pointer" describing how to get to the currently
     * active log region
     */
    regionPointer: Array<number>

    constructor(name: string) {
        this.name           = name
        this.startTime      = new Date()
        this.steps          = []
        this.regionPointer  = []
    }

    log(step: Step) {
        const dest = this.logDestination()
        dest.push(step)
        return dest.length
    }

    beginLogRegion(step: Step) {
        const index = this.log(step)-1
        this.regionPointer.push(index)
    }

    endLogRegion() {
        this.regionPointer.pop()
    }

    logDestination(): Array<Step> {
        if(!this.regionPointer.length) {
            return this.steps
        } else {
            // Deconstruct regionPointer
            const [thisIndex, ...childIndices] = this.regionPointer
            // Navigate to log Step destination
            let logDest = this.steps[thisIndex]
            for(const index of childIndices) {
                logDest = logDest.children[index]
            }
            return logDest.children
        }
    }

    failed(): boolean {
        for(let i = 0; i < this.steps.length; ++i) {
            if(this.steps[i].status === Status.FAIL)
                return true
        }
        return false
    }
}

export class Step {
    realm: Realm
    status: StatusLabel
    message: string
    time: Date
    data: ?any
    children: Array<Step>

    constructor(realm: Realm, status: StatusLabel,
                message: string, data: ?any) {
        this.realm    = realm
        this.status   = status
        this.message  = message
        this.time     = new Date()
        this.data     = data
        this.children = []
    }
}

/*
const report = new Report("Test")
report.beginLogRegion(new Step("region", "info", "A simple region"))
report.log(new Step("test", "pass", "Hellom World"))
report.endLogRegion()
console.log(JSON.stringify(report.steps, null, 2))
*/

export type StatusLabel = "pass" | "fail" | "info"

export const Status = {
    PASS: "pass",
    FAIL: "fail",
    INFO: "info"
}

/**
 * Source of Step (who - ie what part of the code - logged this info).
 * Good for debugging
 */
export type Realm = string
