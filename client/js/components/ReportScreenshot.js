import React, {Component} from "react"

import client from "../graphQL/Client"

class ReportScreenshot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            assets: {}
        }
    }

    render() {
        const {name, pageID, packID, summary,
               steps, setBaselineScreenshot} = this.props
        if(!name) {
            return <span>Loading...</span>
        }

        if(Object.keys(this.state.assets).length === 0) {
            this.retrieveAsset(this.props.summary.screenshotBaseline)
            this.retrieveAsset(this.props.summary.screenshotNew)
        }

        const screenshotNewKey = this.props.summary.screenshotNew
        const lastStep       = steps[steps.length-1]
        const statusLabel    = lastStep.status
        const percDiff       = summary.percentDifference
        const screenshotBase = this.state.assets[summary.screenshotBaseline]
        const screenshotNew  = this.state.assets[summary.screenshotNew]
        const screenshotBaseSrc =
            `data:image/png;base64,${screenshotBase}`
        const screenshotNewSrc  =
            `data:image/png;base64,${screenshotNew}`

        return <div className="report-screenshot">
            <p>Result: {statusLabel}</p>
            <p>Percent different: {percDiff}%</p>
            <img src={screenshotNewSrc}  width="400" height="400"/>
            <img src={screenshotBaseSrc} width="400" height="400"/>
            <button onClick={() => setBaselineScreenshot(screenshotNewKey)}
                    className="btn">
                Accept as Baseline
            </button>
        </div>
        //return ReportScreenshot(this.props)
    }

    retrieveAsset(key) {
        client.query(`query _($key: String!){
            asset(key: $key)
        }`, {key})
        .then(({asset}) => {
            this.setState(state => ({
                ...state,
                assets: {
                    ...state.assets,
                    [key]: asset
                }
            }))
        })
    }
}

/*
const ReportScreenshot = ({
    name, pageID, packID, summary, steps, setBaselineScreenshot
}: any) => {
    if(!name) {
        return <span>Loading...</span>
    }

    summary = summary || {}
    const lastStep       = steps[steps.length-1]
    const statusLabel    = lastStep.status
    const percDiff       = summary.percentDifference
    const screenshotBase = summary.screenshotBaseline
    const screenshotNew  = summary.screenshotNew
    const screenshotBaseSrc =
        `data:image/png;base64,${screenshotBase}`
    const screenshotNewSrc  =
        `data:image/png;base64,${screenshotNew}`
    return <div className="report-screenshot">
        <p>Result: {statusLabel}</p>
        <p>Percent different: {percDiff}%</p>
        <img src={screenshotNewSrc}  width="400" height="400"/>
        <img src={screenshotBaseSrc} width="400" height="400"/>
        <button onClick={() => setBaselineScreenshot(screenshotNew)}
                className="btn">
            Accept as Baseline
        </button>
    </div>
}
*/

export default ReportScreenshot
