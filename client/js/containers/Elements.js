import React       from "react"
import {connect}   from "react-redux"
import {
    lifecycle, compose, withState, setDisplayName
} from "recompose"

import {listElements, createElement} from "../actions/Element"
import Element     from "./Element"
import TextInput   from "../components/base/TextInput"
import Button      from "../components/base/Button"
import AddonsField from "../components/base/AddonsField"
import Heading       from "../components/base/Heading"

import bulma from "../../style/bulma"

const mapStateToProps = (state, ownProps) => {
    return {elements: state.elements}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate(selector) {
            dispatch(createElement({selector}))
        },
        listElements() {
            dispatch(listElements)
        }
    }
}

const ElementsBase = props => {
    const elements = !props.elements || !Object.keys(props.elements).length ? null :
            Object.keys(props.elements).map(elemID =>
                <div className={bulma.box} key={elemID}>
                    <Element elementID={elemID}/>
                </div>
            )
    return <div>
        <Heading size="2">Elements</Heading>
        {elements}
        <AddonsField>
            <TextInput label="Selector"
                       onChange={props.setSelector}/>
            <Button onClick={() => props.onCreate(props.selector)} inline={true} type="info">
                Create Element
            </Button>
        </AddonsField>
    </div>
}

const listElementsEnh = lifecycle({
    componentDidMount() {
        this.props.listElements()
    }
})

const createState = withState("selector", "setSelector", "")

const enhance = compose(listElementsEnh, createState, setDisplayName("Elements"))
const Elements = enhance(ElementsBase)

export default connect(
    mapStateToProps, mapDispatchToProps
)(Elements)
