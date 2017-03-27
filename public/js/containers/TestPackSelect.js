import React, {Component} from "react"
import {connect} from "react-redux"

const mapStateToProps = (state, ownProps) => {
    const testPacks = state.testPacks || []
    return {
        testPacks
    }
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

class TestPackSelect extends Component {
    constructor(props) {
        super(props)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit       = this.handleSubmit.bind(this)
    }

    render() {
        return <div className="test-pack-select">
            <select onChange={this.handleSelectChange}>
                {this.props.testPacks.map(pack =>
                    <option value={pack.id}>{pack.name}</option>)}
            </select>
            <button onClick={this.handleSubmit}
                    disabled={!this.state.selectedID}>
                Add Test Pack
            </button>
        </div>
    }

    handleSubmit() {
        this.props.onSubmit(this.state.selectedID)
    }

    handleSelectChange(event) {
        this.setState({selectedID: event.target.value})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPackSelect)
