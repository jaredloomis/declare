import React from "react"

import bulma from "../../../style/bulma"

const Breadcrumb = ({crumbs}) => {
    return <nav className={bulma.breadcrumb} aria-label="breadcrumbs">
        <ul>
            {(crumbs || []).map((crumb, crumbI) =>
                <li className={crumbI === crumbs.length-1 ? bulma.is_active : ""} key={crumbI}>
                    <a href={crumb.url}>{crumb.component || crumb.text}</a>
                </li>
            )}
        </ul>
    </nav>
}

Breadcrumb.displayName = "Breadcrumb"
export default Breadcrumb
