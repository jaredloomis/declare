import React from "react"

import bulma from "../../style/bulma.scss"

const Nav = () => <nav className={`${bulma.navbar} ${bulma.is_primary}`}>
    <div className={bulma.navbar_brand}>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/">
            Home
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/Workspace">
            Workspace
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/Products">
            Products
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/TestRuns">
            Test Runs
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/SignIn">
            Sign In
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/SignUp">
            Sign Up
        </a>
    </div>
</nav>

Nav.displayName = "Nav"
export default Nav
