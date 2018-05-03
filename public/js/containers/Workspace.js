import {
    compose, lifecycle, withProps, setDisplayName, withState
} from "recompose"

import {listCategories}  from "../actions/Category"
import {listPages}       from "../actions/Page"
import {listElements}    from "../actions/Element"
import {listInputTypes}  from "../actions/InputType"

import Workspace         from "../components/Workspace"

import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const enhance = compose(
    withReduxState(["categories", "elements", "pages", "inputTypes"]),
    withReduxDispatch({
        listCategories,
        listInputTypes,
        listElements,
        listPages
    }),
    lifecycle({
        componentDidMount() {
            this.props.listPages()
        }
    }),
    setDisplayName("WorkspaceContainer")
)

export default enhance(Workspace)
