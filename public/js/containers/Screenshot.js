import React          from "react"
import {compose, setDisplayName, lifecycle, withState} from "recompose"

import Modal             from "../components/base/Modal"
import withReduxDispatch from "./WithReduxDispatch"
import withReduxState    from "./WithReduxState"

import {fetchAsset} from "../actions/Asset"

const Screenshot = props => {
    const source = (() => {
        if(props.assetKey && props.assets)
            return props.assets[props.assetKey]
        else if(props.base64)
            return `data:image/png;base64,${props.base64}`
        else if(props.url)
            return props.url
    })()

    const openModal  = () => props.setExpanded(true)
    const closeModal = () => props.setExpanded(false)

    return [
        <img src={source} onClick={openModal} key="screenshot-img"/>,
        <Modal active={props.expanded} onClose={closeModal} key="screenshot-modal">
            <img src={source} onClick={openModal}/>
        </Modal>
    ]
}

const enhance = compose(
    withReduxState(["assets"]),
    withReduxDispatch({
        fetchAsset: {
            parameterized: fetchAsset
        }
    }),
    withState("expanded", "setExpanded", false),
    lifecycle({
        componentDidMount() {
            if(this.props.assetKey)
                this.props.fetchAsset(this.props.assetKey)
        }
    }),
    setDisplayName("Screenshot")
)

export default enhance(Screenshot)
