import React from "react"

import ReportScreenshot from "./ReportScreenshot"

const Report = props => {
    const {name, pageID, packID, steps} = props
    return <div className="report card deep-purple lighten-1">
    <div className="card-content">
        <span className="card-title">{name}</span>
        {renderReportMain(props)}
        <ul className="collection">
            {(steps || []).map(renderStep)}
        </ul>
    </div>
    </div>
}

const renderReportMain = props => {
    return <ReportScreenshot {...props}/>
}

const renderStep = ({status, time, message, data}, i) => {
    const timeStr  = new Date(time).toLocaleString()
    return <li className="collection-item row" key={i}>
        <span className="col s3">{status}</span>
        <span className="col s3">{timeStr}</span>
        <span className="col s6">{message}</span>
    </li>
}

Report.displayName = "Report"
export default Report
