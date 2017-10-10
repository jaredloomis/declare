import React from "react"

import bulma from "../../style/bulma.scss"
//import style from "../../style/App.scss"

const Nav = () => <nav className={`${bulma.navbar} ${bulma.is_primary}`}>
    <div className={bulma.navbar_brand}>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/">
            Home
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/">
            Pages
        </a>
        <a className={`${bulma.navbar_item} ${bulma.has_text_white}`} href="#/">
            Elements
        </a>
    </div>
</nav>

Nav.displayName = "Nav"
export default Nav
