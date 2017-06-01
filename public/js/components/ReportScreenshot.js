import React from "react"

const ReportScreenshot = ({name, pageID, packID, summary, steps}) => {
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
    </div>
}

ReportScreenshot.displayName = "ReportScreenshot"
export default ReportScreenshot
