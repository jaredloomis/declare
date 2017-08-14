import React       from "react"
import {connect}   from "react-redux"
import {
    lifecycle, compose, withState, setDisplayName
} from "recompose"

import Element from "./Element"
import {listElements, createElement} from "../actions/Element"
import TextInput from "../components/base/TextInput"
import Button    from "../components/base/Button"

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
                <Element elementID={elemID} key={elemID}/>
            )
    return <div>
        {elements}
        <TextInput label="Selector"
                   onChange={ev => props.setSelector(ev.target.value)}/>
        <Button onClick={() => props.onCreate(props.selector)}>+</Button>
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
