import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listEnvironments, createEnvironment}  from "../actions/Environment"

import Modal                from "../components/base/Modal"
import Row                  from "../components/base/Row"
import Column               from "../components/base/Column"
import Link                 from "../components/base/Link"
import Button               from "../components/base/Button"
import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"
import EnvironmentCreate    from "./EnvironmentCreate"

const EnvironmentList = props => {
    const openModal     = () => props.setCreateInProgress(true)
    const closeModal    = () => props.setCreateInProgress(false)

    const environmentList = Object.keys(props.environments).map(envID => {
        const env = props.environments[envID]
        return <Row key={env._id}>
            <Column>
                <Link to={`#/Environment/${env._id}`}>{env.name}</Link>
            </Column>
        </Row>
    })

    return [
        ...environmentList,
        <Button onClick={openModal} key="environmentlist-btn">+</Button>,
        <Modal active={props.createInProgress} onClose={closeModal} key="environmentlist-modal">
            <EnvironmentCreate/>
        </Modal>
    ]
}

const enhance = compose(
    withReduxState(["environments"]),
    withReduxDispatch({
        listEnvironments,
        createEnvironment: {
            parameterized: createEnvironment
        }
    }),
    withState("createInProgress", "setCreateInProgress", false),
    lifecycle({
        componentDidMount() {
            this.props.listEnvironments()
        }
    }),
    setDisplayName("EnvironmentListContainer")
)

export default enhance(EnvironmentList)
