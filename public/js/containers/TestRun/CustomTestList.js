import React from "react"
import {
    setDisplayName, lifecycle, compose
} from "recompose"

import Row               from "../base/Row"
import withReduxState    from "../../containers/withReduxState"
import withReduxDispatch from "../../containers/withReduxDispatch"

import {listCustomTests} from "../../actions/CustomTest"

const CustomTestList ({exclude, customTests}) => {
    return <div>
        
    </div>
}

const enhance = compose(
    setDisplayName("CustomTestList"),
    withReduxState(["customTests"]),
    withReduxDispatch({
        listCustomTests
    }),
    lifecycle({
        componentDidMount() {
            if(!this.customTests)
                this.props.listCustomTests()
        }
    })
)
