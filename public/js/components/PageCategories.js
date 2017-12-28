import React            from "react"
import {setDisplayName} from "recompose"

import Box              from "./base/Box"
import Category         from "../containers/Category"

const PageCategoriesBase = () => {
    // Hard-coded category temporarily
    return <Box>
        <Category categoryID="5a209f9f04356056629b0e98"/>
    </Box>
}

const enhance = setDisplayName("PageCategories")
export default enhance(PageCategoriesBase)
