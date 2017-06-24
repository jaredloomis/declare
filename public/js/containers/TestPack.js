import React, {Component} from "react"
import {connect} from "react-redux"

import {updatePackValue} from "../actions/Page"
import {fetchPack} from "../actions/TestPack"
import Field from "../components/Field"
import Report from "./Report"
import {deepGet} from "../lib/Deep"

import "../../style/TestPack.scss"

const mapStateToProps = (state, ownProps) => {
    // Copy over all TestPack props
    const props = Object.assign({}, state.testPacks[ownProps.packID]) || {}
    // Assign props.{values, reports} based on page.testPackData
    const page = state.pages[ownProps.pageID]
    if(page && page.testPackData) {
        const testPackData = page.testPackData
                         .filter(dat => dat.testPack === ownProps.packID)[0]
        if(testPackData) {
            props.values  = testPackData.values
            props.reports = testPackData.reports
        }
    }
    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: uid => event => {
            dispatch(updatePackValue(uid, event.target.value))
        },
        fetchPack: () => {
            dispatch(fetchPack(ownProps.packID))
        }
    }
}

class TestPack extends Component {
    constructor(props) {
        super(props)
        this.remove        = this.remove.bind(this)
        this.manyRemove    = this.manyRemove.bind(this)
        this.fieldValue    = this.fieldValue.bind(this)
        this.fieldUID      = this.fieldUID.bind(this)
        this.toggleReports = this.toggleReports.bind(this)

        this.state = {
            reportsExpanded: false
        }
    }

    componentDidMount() {
        this.props.fetchPack()
    }

    render() {
        if(!this.props.name) {
            return <p>Loading...</p>
        }

        const fields = this.props.fields || {}
        const form = Object.keys(fields).map(id => {
            const field = this.props.fields[id]
            const uid   = this.fieldUID(id)
            return <Field uid={uid}
                          type={field.type}
                          options={field.options}
                          defaultValue={this.fieldValue(uid)}
                          onChange={this.props.onChange}
                          onManyRemove={this.manyRemove}
                          key={id}/>
        })

        return <div className="test-pack card">
            <div className="card-content">
                <span className="test-pack-name card-title">
                    {this.props.name}
                </span>
                <button onClick={this.remove}
                        className="btn-floating btn-small red right">
                    <i className="large material-icons">delete</i>
                </button>
                <button onClick={this.props.onExecute}
                        className="btn-floating btn-small green right">
                    <i className="large material-icons">play_arrow</i>
                </button>
                <div className="test-pack-form">
                    {form}
                </div>
                <div className="test-pack-reports">
                    <button className="btn-flat" onClick={this.toggleReports}>
                        {this.state.reportsExpanded ? "Hide" : "Show"} Reports
                    </button>
                    {this.renderReports()}
                </div>
            </div>
        </div>
    }

    renderReports() {
        if(this.state.reportsExpanded) {
            return this.props.reports.reverse().map(reportID =>
                <Report reportID={reportID}
                        pageID={this.props.pageID}
                        packID={this.props.packID}
                        key={reportID}/>
            )
        } else {
            return []
        }
    }

    toggleReports() {
        this.setState(state => ({
            reportsExpanded: !state.reportsExpanded
        }))
    }

    manyRemove(uid) {
        return this.props.onManyRemove(uid)
    }

    remove() {
        return this.props.onRemove()
    }

    fieldValue(uid) {
        const [pageID, packID, ...selector] = uid.split(".")
        return deepGet(selector, this.props.values)
    }

    fieldUID(id) {
        return `${this.props.pageID}.${this.props.packID}.${id}`
    }
}

const sortReports = reports => {
    return reports.sort((a, b) => {
        const timeA = new Date(a.steps[0].time).getTime()
        const timeB = new Date(b.steps[0].time).getTime()
        return timeA < timeB ?  1 :
               timeA > timeB ? -1 :
                                0
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPack)
