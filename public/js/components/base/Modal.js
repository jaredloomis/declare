import React from "react"

import FeatherIcon from "./FeatherIcon"

import bulma from "../../../style/bulma.scss"
import style from "../../../style/Modal.scss"

export default class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.handleDragStart = this.handleDragStart.bind(this)
        this.handleDrag      = this.handleDrag.bind(this)
        this.handleDragEnd   = this.handleDragEnd.bind(this)
        this.handleClose     = this.handleClose.bind(this)

        this.state = {
            dragDelta: {
                x: 0, y: 0
            },
            dragStart: {
                x: 0, y: 0
            }
        }
    }

    handleClose() {
        this.setState({
            ...this.state,
            dragDelta: {
                x: 0,
                y: 0
            }
        })
        this.props.onClose()
    }

    handleDragStart(event) {
        this.setState({
            ...this.state,
            dragStart: {
                x: event.screenX,
                y: event.screenY
            }
        })
        document.body.addEventListener("mousemove", this.handleDrag)
        window.addEventListener("mouseup", this.handleDragEnd)
    }

    handleDrag(event) {
        this.setState({
            ...this.state,
            dragStart: {
                x: event.screenX,
                y: event.screenY
            },
            dragDelta: {
                x: this.state.dragDelta.x + event.screenX - this.state.dragStart.x,
                y: this.state.dragDelta.y + event.screenY - this.state.dragStart.y
            }
        })
    }

    handleDragEnd() {
        document.body.removeEventListener("mousemove", this.handleDrag)
        window.removeEventListener("mouseup", this.handleDragEnd)
    }

    render() {
        const dragTransform = {
            transform: `translate(${this.state.dragDelta.x}px, ${this.state.dragDelta.y}px)`
        }

        return <div className={`${bulma.modal} ${this.props.active ? bulma.is_active : ""}
                         ${this.props.wide || this.props.large ? style.wideModal : ""}`}>
            {/*<div className={bulma.modal_background} onClick={this.handleClose}>
            </div>*/}
            <div className={`${bulma.modal_content} ${style.content}`} style={dragTransform}>
                <div className={style.handle} onMouseDown={this.handleDragStart}>
                    <div className={style.closeButton} onClick={this.handleClose}>
                        <FeatherIcon icon="x"/>
                    </div>
                </div>
                {this.props.topBar && <div className={style.topBar}>
                    {this.props.topBar}
                </div>}
                <div className={style.innerContent}>
                    {this.props.children}
                </div>
                {this.props.bottomBar && <div className={style.bottomBar}>
                    {this.props.bottomBar}
                </div>}
            </div>
            {/*<button onClick={this.handleClose} className={`${bulma.modal_close} ${bulma.is_large}`} aria-label="close">
            </button>*/}
        </div>
        /*return <ReactModal isOpen={this.props.active} onRequestClose={this.handleClose} contentLabel="wasabi" style={modalStyle}>
            <div className={style.handle} onMouseDown={this.handleDragStart}/>
            <div className={style.content}>
                {this.props.children}
            </div>
        </ReactModal>*/
    }
}
