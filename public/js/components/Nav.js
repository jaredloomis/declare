import React from "react"

import FeatherIcon   from "./base/FeatherIcon"
import ProductSelect from "../containers/ProductSelect"

import bulma from "../../style/bulma.scss"
import style from "../../style/Nav.scss"

const Nav = ({focusProduct, onSelectFocusProduct}) =>
    <nav className={`${bulma.navbar} ${bulma.has_shadow} ${bulma.is_spaced}`}>
    <img src="/logo-blue.png" width="70" height="70" style={{width: "70px", height: "70px"}}/>
    <div className={bulma.container}>
        <div className={bulma.navbar_brand}>
            {/*
            <a className={`${bulma.navbar_item} ${style.logo}`} href="#/">
                Declare
            </a>
            */}
            <span className={`${bulma.navbar_item}`}>
                <ProductSelect flat defaultValue={focusProduct} onChange={onSelectFocusProduct}/>
            </span>
        </div>
        <div className={`${bulma.navbar_menu} ${style.menu}`}>
            <a className={`${bulma.navbar_item} ${style.navItem}`} href="#/Products">
                <FeatherIcon icon="gift"/>
                <br/>
                Products
            </a>
            <a className={`${bulma.navbar_item} ${style.navItem}`} href="#/Environments">
                <FeatherIcon icon="list"/>
                <br/>
                Environments
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
