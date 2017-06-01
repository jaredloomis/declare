import React, {Component} from "react"
import {connect} from "react-redux"

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.testPacks[ownProps.packID]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}


class TestPackMini extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="test-pack-mini card">
            <div className="card-content" onClick={this.props.onSelect}>
                <span className="test-pack-mini-name card-title">
                    {this.props.name}
                </span>
            </div>
        </div>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestPackMini)
