import React, {Component} from "react"
import {connect} from "react-redux"
import {updatePackValue, fetchPage} from "../actions/Page"
import PageComponent from "../components/Page"
import keyCollection from "../lib/KeyCollection"

const mapStateToProps = (state, ownProps) => {
    const props = state.pages[ownProps.pageID] || {}
    if(props.testPackData) {
        props.testPacks = props.testPackData
        .map(dat => state.testPacks[dat.testPack])
        .filter(pack => pack)
    }
    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: uid => event => {
            dispatch(updatePackValue(uid, event.target.value))
        },
        fetchPage: () => {
            dispatch(fetchPage(ownProps.pageID))
        }
    }
}

class Page extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPage()
    }

    render() {
        if(this.props.name)
            return <PageComponent
                        {...this.props}
                        testPackData={this.props.testPackData}/>
        else
            return <p>Loading...</p>
    }

    keyedTestPackData() {
        const ret = {}
        for(let i = 0; i < this.props.testPackData.length; ++i) {
            const dat = this.props.testPackData[i]
            ret[dat.id] = dat
        }
        return ret
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)
