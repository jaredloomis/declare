import React, {Component} from "react"
import {connect} from "react-redux"
import {updatePackValue} from "../actions/Page"
import {fetchPack} from "../actions/TestPack"
import TestPackComponent from "../components/TestPack"

const mapStateToProps = (state, ownProps) => {
    // Copy over all TestPack props
    const props = state.testPacks[ownProps.packID] || {}
    // Assign props.values based on page.testPackData
    const page = state.pages[ownProps.pageID]
    if(page) {
        const testPackData = page.testPackData
                         .filter(dat => dat.testPack === ownProps.packID)[0]
        if(testPackData)
            props.values = testPackData.values
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
    }

    componentDidMount() {
        this.props.fetchPack()
    }

    render() {
        if(this.props.name)
            return <TestPackComponent {...this.props}
                        packID={this.props.pageID + "." + this.props.packID}/>
        else
            return <p>Loading...</p>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPack)
