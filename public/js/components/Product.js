import React            from "react"
import {setDisplayName} from "recompose"

import Heading            from "./base/Heading"
import Box              from "./base/Box"
import Panel            from "./base/Panel"
import PageLink         from "../containers/PageLink"
import Category         from "../containers/Category"
import CategoryAdd      from "../containers/CategoryAdd"
import PageAdd          from "../containers/PageAdd"

const Product = props => {
    const {name, pageCategories, elementCategories, inputTypeCategories} = props

    const pageList = pageCategories && pageCategories.map(categoryID =>
        <Category categoryID={categoryID} productID={props._id} key={categoryID}/>
    )

    const elementList = elementCategories && elementCategories.map(categoryID =>
        <Category categoryID={categoryID} productID={props._id} key={categoryID}/>
    )

    const inputTypeList = inputTypeCategories && inputTypeCategories.map(categoryID =>
        <Category categoryID={categoryID} productID={props._id} key={categoryID}/>
    )

    return <div>
        <Heading size="2">{name}</Heading>
        <Box>
            <Heading size="3">Pages</Heading>
            {pageList}
            <CategoryAdd itemRef="page" onCreate={props.onCategoryCreate}/>
        </Box>
        <Box>
            <Heading size="3">Elements</Heading>
            {elementList}
            <CategoryAdd itemRef="element" onCreate={props.onCategoryCreate}/>
        </Box>
        <Box>
            <Heading size="3">Input Types</Heading>
            {inputTypeList}
            <CategoryAdd itemRef="inputType" onCreate={props.onCategoryCreate}/>
        </Box>
    </div>
}

const enhance = setDisplayName("Product")

export default enhance(Product)
