import React, {Component} from "react"
import {connect}          from "react-redux"

import Expandable              from "../components/Expandable"
import ReportScreenshot        from "../components/ReportScreenshot"
import ReportDestructive       from "../components/ReportDestructive"
import {setBaselineScreenshot, fetchReport} from "../actions/Page"
import {internalIDs} from "../../../app/config/TestPack"

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.reports[ownProps.reportID],
        testPacks: state.testPacks
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchReport() {
            dispatch(fetchReport(ownProps.reportID))
        },
        setBaselineScreenshot(image) {
            dispatch(
                setBaselineScreenshot(ownProps.pageID, ownProps.packID, image)
            )
        }
    }
}

class Report extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(!this.props.name)
            this.props.fetchReport()
    }

    render() {
        const {name, steps} = this.props
        return <div className="report card deep-purple lighten-1">
            <div className="card-content">
                <span className="card-title">{name}</span>
                {renderReportMain(this.props)}
                <ul className="collection">
                    {(steps || []).map(renderStep)}
                </ul>
            </div>
        </div>
    }
}

const renderReportMain = props => {
    const {internalID} = props.testPacks[props.packID]
    if(internalID === internalIDs.screenshot)
        return <ReportScreenshot {...props}/>
    else if(internalID === internalIDs.destructive)
        return <ReportDestructive {...props}/>
    else
        throw new Error("Unknown report")
}

const renderStep = ({status, time, message, data, children}, i) => {
    const childElements = children && children.map((child, j) =>
        renderStep(child, i + (j * 0.0001))
    )
    const childList = children && <ul>
        {childElements}
    </ul>

    const timeStr  = new Date(time).toLocaleString()
    return <li className="collection-item row" key={i}>
        <span className="col s3">{status}</span>
        <span className="col s3">{timeStr}</span>
        <span className="col s6">{message}</span>
        {childList}
    </li>
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report)
