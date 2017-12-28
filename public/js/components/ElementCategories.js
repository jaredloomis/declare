import React            from "react"
import {setDisplayName} from "recompose"

import Box              from "./base/Box"
import Category         from "../containers/Category"

const ElementCategoriesBase = () => {
    // Hard-coded category temporarily
    return <Box>
        <Category categoryID="5a44484ef62c6b55b90016f2"/>
    </Box>
}

const enhance = setDisplayName("ElementCategories")
export default enhance(ElementCategoriesBase)
