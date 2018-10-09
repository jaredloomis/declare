import React from "react"
import {
    compose, lifecycle, setDisplayName, withState
} from "recompose"

import {listEnvironments, createEnvironment}  from "../actions/Environment"

import Modal                from "../components/base/Modal"
import List                 from "../components/base/List"
import Link                 from "../components/base/Link"
import Button               from "../components/base/Button"
import withReduxState       from "./WithReduxState"
import withReduxDispatch    from "./WithReduxDispatch"
import EnvironmentCreate    from "./EnvironmentCreate"

const EnvironmentList = props => {
    const openModal     = () => props.setCreateInProgress(true)
    const closeModal    = () => props.setCreateInProgress(false)

    const environmentList = <List key="envl-view">
        {Object.keys(props.environments).map(envID => {
            const env = props.environments[envID]
            return <Link to={`#/Environment/${env._id}`} key={envID}>
                {env.name}
            </Link>
        })}
    </List>

    return [
        environmentList,
        <br key="envl-br"/>,
        <Button type="primary" onClick={openModal} key="environmentlist-btn">+</Button>,
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
