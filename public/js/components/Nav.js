import React from "react"

import bulma from "../../style/bulma.scss"

const Nav = () => <nav className={`${bulma.navbar} ${bulma.is_primary}`}>
    <div className={bulma.navbar_brand}>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/">
            Home
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/SignIn">
            Sign In
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/SignUp">
            Sign Up
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/Pages">
            Pages
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/Elements">
            Elements
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/InputTypes">
            Input Types
        </a>

    </div>
</nav>

Nav.displayName = "Nav"
export default Nav
