import React            from "react"
import {setDisplayName} from "recompose"

import Box              from "./base/Box"
import Category         from "../containers/Category"

const InputTypeCategoriesBase = () => {
    // Hard-coded category temporarily
    return <Box>
        <Category categoryID="5a4443e5f62c6b55b9001420"/>
    </Box>
}

const enhance = setDisplayName("InputTypeCategories")
export default enhance(InputTypeCategoriesBase)
