import React, {Component} from "react"

import Page from "./Page"
import "../../style/materialize.scss"
import "../../node_modules/materialize-css/js/materialize"

////// TEST DATA

const TEST_PACKS = {
    destructiveInput: {
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

const App = () => <div className="container">{PAGES_DOM[0]}</div>

App.displayName = "App"
export default App
