import React, {Component} from "react"
import Field from "./Field"
import Report from "../containers/Report"
import {deepGet} from "../lib/Deep"

import "../../style/TestPack.scss"

export default class TestPack extends Component {
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

    render() {
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
            const rawReports = this.props.reports || []
            const reports = sortReports(rawReports).slice(0, 5)
            return reports.map(report =>
                <Report {...report} key={report._id}/>
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
        return `${this.props.packID}.${id}`
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
