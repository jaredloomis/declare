import React from "react"
import {
    withState, setDisplayName, compose
} from "recompose"

import style from "../../../style/Tile.scss"

const Tile = props => {
    const {
        children, onClick, overlay,
        hover, setHover
    } = props
    const onMouse = active => () => setHover(active)

    return <div className={`${style.tile} ${hover ? style.isHovered : ""}
                            ${overlay ? style.hasOverlay : ""}`}
                onMouseOver={onMouse(true)}
                onMouseOut={onMouse(false)}
                onClick={onClick}>
        <span className={style.hoverIcon}>{overlay}</span>
        {children}
    </div>

}

const enhance = compose(
    withState("hover", "setHover", false),
    setDisplayName("Tile")
)

export default enhance(Tile)
