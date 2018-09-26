import React from "react"

import FeatherIcon   from "./base/FeatherIcon"
import ProductSelect from "../containers/ProductSelect"

import bulma from "../../style/bulma.scss"
import style from "../../style/Nav.scss"

const Nav = ({focusProduct, onSelectFocusProduct}) => <nav className={style.nav}>
    <div className={style.content}>
    <div className={style.left}>
        <div className={style.navItem}>
            <img src="/logo-blue.png" width="70" height="70" style={{width: "70px", height: "70px"}}/>
        </div>
        <div className={style.navItem}>
            <ProductSelect flat defaultValue={focusProduct}
                onChange={onSelectFocusProduct}/>
        </div>
    </div>
    <div className={style.right}>
        <a className={style.navItem} href="#/Products">
            <FeatherIcon icon="gift"/>
            <br/>
            Products
        </a>
        <a className={style.navItem} href="#/Environments">
            <FeatherIcon icon="list"/>
            <br/>
            Environments
        </a>
        <a className={style.navItem} href="#/Pages">
            <FeatherIcon icon="file-text"/>
            <br/>
            Pages
        </a>
        <a className={style.navItem} href="#/TestRuns">
            <FeatherIcon icon="play"/>
            <br/>
            Test Runs
        </a>
        <a className={style.navItem} href="#/Elements">
            <FeatherIcon icon="arrow-up-left"/>
            <br/>
            Elements
        </a>
    </div>
    </div>
</nav>

Nav.displayName = "Nav"
export default Nav
