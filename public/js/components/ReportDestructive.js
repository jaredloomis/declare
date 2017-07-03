import React, {Component} from "react"

export default class ReportDestructive extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {name, steps} = this.props
        if(!name) {
            return <span>Loading...</span>
        }

        const lastStep       = steps[steps.length-1]
        const statusLabel    = lastStep.status

        return <div className="report-destructive">
            <p>Result: {statusLabel}</p>
        </div>
    }
}

