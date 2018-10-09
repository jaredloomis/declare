import React      from "react"
import codeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/solarized.css"
import "codemirror/mode/javascript/javascript.js"

import style from "../../../style/CodeEditor.scss"

class CodeEditor extends React.Component {
    constructor(props) {
        super(props)

        this.editorValueChanged = this.editorValueChanged.bind(this)
        this.cursorActivity     = this.cursorActivity.bind(this)
        this.focusChanged       = this.focusChanged.bind(this)
        this.scrollChanged      = this.scrollChanged.bind(this)
        this.handleDragStart    = this.handleDragStart.bind(this)
        this.handleDrag         = this.handleDrag.bind(this)
        this.handleDragEnd      = this.handleDragEnd.bind(this)

        this.textarea = React.createRef()
        this.state = {
            codeMirrorInstance: codeMirror,
            codeMirror:         null
        }
    }

    componentDidMount() {
        if(this.textarea.current) {
            this.codeMirror = this.state.codeMirrorInstance.fromTextArea(this.textarea.current, {
                mode: "javascript",
                theme: "solarized light",
                lineNumbers: true,
                ...this.props.options
            })
            this.codeMirror.on("change", this.editorValueChanged)
            this.codeMirror.on("cursorActivity", this.cursorActivity)
            this.codeMirror.on("focus", this.focusChanged.bind(this, true))
            this.codeMirror.on("blur", this.focusChanged.bind(this, false))
            this.codeMirror.on("scroll", this.scrollChanged)
            this.codeMirror.setSize(null, this.props.height || "100px")
            this.codeMirror.setValue(this.props.defaultValue || this.props.value || "")
        }
    }

    editorValueChanged(doc, change) {
        this.props.onChange(doc.getValue(), change)
    }

    cursorActivity() {
    
    }

    focusChanged(status) {
    
    }

    scrollChanged() {
    
    }

    handleDragStart(event) {
        this.setState({
            ...this.state,
            dragStartY: event.screenY,
            dragStartHeight: this.codeMirror.getScrollInfo().height
        })
        document.body.addEventListener("mousemove", this.handleDrag)
        window.addEventListener("mouseup", this.handleDragEnd)
    }

    handleDrag(event) {
        const MIN_HEIGHT = 100
        this.codeMirror.setSize(null,
            Math.max(MIN_HEIGHT, (this.state.dragStartHeight + event.screenY - this.state.dragStartY)) + "px"
        )
    }

    handleDragEnd() {
        document.body.removeEventListener("mousemove", this.handleDrag)
        window.removeEventListener("mouseup", this.handleDragEnd)
    }

    render() {
		return <div>
			<textarea
                ref={this.textarea}
                name={this.props.name || this.props.path}
                defaultValue={this.props.defaultValue}
                autoComplete="off"
                autoFocus={this.props.autoFocus}/>
            <div className={style.handle} onMouseDown={this.handleDragStart}/>
        </div>
    }
}

export default CodeEditor
