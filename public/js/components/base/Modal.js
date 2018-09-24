import React from "react"
//import Draggable from "react-draggable"

import bulma from "../../../style/bulma.scss"
import style from "../../../style/Modal.scss"

const Modal = ({children, topBar, bottomBar, active, wide, large, onClose}) =>
    <div className={`${bulma.modal} ${active ? bulma.is_active : ""}
                     ${wide || large ? style.wideModal : ""}`}>
        <div className={bulma.modal_background} onClick={onClose}>
        </div>
        <div className={`${bulma.modal_content} ${style.content}`}>
            <div className={style.handle}>
            </div>
            {topBar && <div className={style.topBar}>
                {topBar}
            </div>}
            <div className={style.innerContent}>
                {children}
            </div>
            {bottomBar && <div className={style.bottomBar}>
                {bottomBar}
            </div>}
        </div>
        <button onClick={onClose} className={`${bulma.modal_close} ${bulma.is_large}`} aria-label="close">
        </button>
    </div>

Modal.displayName = "Modal"
export default Modal
