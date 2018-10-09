import React, {Component} from "react"
import {connect} from "react-redux"
import {listPacks} from "../actions/TestPack"
import Select from "../components/base/Select"

const mapStateToProps = (state, ownProps) => {
    // Copy over all TestPack props
    const props = {
        testPacks: Object.assign({}, state.testPacks || {})
    }
    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: ownProps.onChange,
        listPacks() {
            dispatch(listPacks)
        }
    }
}

class TestPackSelect extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.listPacks()
    }

    render() {
        const packs = !this.props.testPacks ? {} :
            Object.keys(this.props.testPacks).map(packID => {
                const name = this.props.testPacks[packID].name
                return <span value={packID} key={packID}>{name}</span>
            })

        return <Select label="Test Pack" onChange={this.props.onChange} {...this.props}>
            {packs}
        </Select>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPackSelect)
