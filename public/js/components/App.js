import React, {Component} from "react"
import {Lokka}            from "lokka"
import {Transport}        from "lokka-transport-http"

import Page from "./Page"
import "../../style/materialize.scss"
import "../../node_modules/materialize-css/js/materialize"

////// TEST DATA

const TEST_PACKS = {
    destructiveInput: {
        id: "destructiveInput",
        name: "Destructive Input",
        fields: {
            "startURL": {
                type: "text",
                options: {
                    name: "Start URL"
                }
            },
            "identifier": {
                type: "text",
                options: {
                    name: "Identifier Element"
                }
            },
            "errorElement": {
                type: "text",
                options: {
                    name: "Error Element"
                }
            },
            "forms": {
                type: {
                    "inputs": {
                        type: {
                            "element": {
                                type: "text",
                                options: {
                                    name: "Input Element"
                                }
                            },
                            "inputType": {
                                type: "dropdown",
                                options: {
                                    name: "Input Type"
                                }
                            }
                        },
                        options: {
                            name: "Inputs"
                        }
                    },
                    "submit": {
                        type: "text",
                        options: {
                            name: "Submit"
                        }
                    },
                    "destination": {
                        type: "dropdown",
                        options: {
                            name: "Destination"
                        }
                    }
                },
                options: {
                    name: "Forms"
                }
            }
        },
        values: {
            "inputs": {
                selector: "#login"
            }
        }
    },
    screenshotChange: {
        id: "screenshotChange",
        name: "Screenshot Change",
        fields: {
            "maxPercent": {
                type: "range",
                options: {
                    name: "Max % Change",
                    min: 1,
                    max: 100
                }
            }
        },
        values: {
            "maxPercent": 10
        }
    }
}

const PAGES = [
    {
        name: "Log In",
        testPacks: [
            TEST_PACKS.destructiveInput,
            TEST_PACKS.screenshotChange
        ]
    }
]

const PAGES_DOM = PAGES.map(page =>
    <Page name={page.name} testPacks={page.testPacks} key={page.name}/>
)

///////////

const client = new Lokka({
    transport: new Transport("/graphql")
})

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: []
        }
    }
    
    async componentDidMount() {
        const data = await client.query(`{
            pages {
                _id name
                startURL
                testPacks {
                    _id name
                    fields values
                }
            }
        }`)
        this.setState(data)
    }

    render() {
        console.log("WHATS UP" + JSON.stringify(this.state.pages))
        return <div className="container">
            {this.state.pages.map(page =>
             <Page name={page.name} testPacks={page.testPacks} key={page.name}/>
            )}
        </div>
        //return <div className="container">{this.state.pages[0]}</div>
        //return <div className="container">{PAGES_DOM[0]}</div>
    }
}

export default () => <div>
    
</div>

///////


