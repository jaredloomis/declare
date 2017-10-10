import React, {Component} from "react"

import bulma from "../../style/bulma"

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
        const statusClass    =
            lastStep.status === "pass" ? bulma.is_success :
            lastStep.status === "fail" ? bulma.is_danger  :
            lastStep.status === "info" ? bulma.is_info    :
                                         ""

        return <div>
            <p>Result:
                <span className={`${bulma.tag} ${statusClass} ${bulma.is_medium}`}>{statusLabel}</span>
            </p>
        </div>
    }
}

