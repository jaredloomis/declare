import React, {Component} from "react"
import {connect}          from "react-redux"

import ReportScreenshot        from "../components/ReportScreenshot"
import {setBaselineScreenshot, fetchReport} from "../actions/Page"

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.reports[ownProps.reportID]
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
        const {name, pageID, packID, steps} = this.props
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report)
