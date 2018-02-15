import React from "react"

import Box from "./base/Box"
import bulma from "../../style/bulma.scss"

const ErrorModal = ({message, active, onClose}) =>
    <div className={`${bulma.modal} ${active ? bulma.is_active : ""}`}>
        <div className={bulma.modal_background}>
            Modal Background
        </div>
        <div className={bulma.modal_content}>
            <Box>
                {message}
            </Box>
        </div>
        <button onClick={onClose} className={`${bulma.modal_close} ${bulma.is_large}`} aria-label="close">
        </button>
    </div>

ErrorModal.displayName = "ErrorModal"
export default ErrorModal
