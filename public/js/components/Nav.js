import React from "react"

import Select        from "./base/Select"
import FeatherIcon   from "./base/FeatherIcon"
import ProductSelect from "../containers/ProductSelect"

import bulma from "../../style/bulma.scss"
import style from "../../style/Nav.scss"

const Nav = ({onSelectFocusProduct}) =>
    <nav className={`${bulma.navbar} ${bulma.has_shadow} ${bulma.is_spaced}`}>
    <div className={bulma.container}>
        <div className={bulma.navbar_brand}>
            <span className={`${bulma.navbar_item}`}>
                Declare
            </span>
            <span className={`${bulma.navbar_item}`}>
                <ProductSelect flat defaultValue="default" onChange={onSelectFocusProduct}/>
            </span>
        </div>
        <div className={`${bulma.navbar_menu} ${style.menu}`}>
            <a className={`${bulma.navbar_item} ${style.navItem}`} href="#/">
                <FeatherIcon icon="home"/>
                <br/>
                Home
            </a>
            <a className={`${bulma.navbar_item} ${style.navItem}`} href="#/Pages">
                <FeatherIcon icon="file-text"/>
                <br/>
                Pages
            </a>
            <a className={`${bulma.navbar_item} ${style.navItem}`} href="#/TestRuns">
                <FeatherIcon icon="play"/>
                <br/>
                Test Runs
            </a>
            <a className={`${bulma.navbar_item} ${style.navItem}`} href="#/Elements">
                <FeatherIcon icon="arrow-up-left"/>
                <br/>
                Elements
            </a>
        </div>
    </div>
    </nav>

Nav.displayName = "Nav"
export default Nav
