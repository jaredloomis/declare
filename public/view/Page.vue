<template>
<div>
    <span class="pageName">{{name}}</span>
    <div v-for="packDat in testPacksData" class="packViewContainer">
        <TestPackView :name="packDat.name"
                      :fields="packDat.id"
                      :values="packDat.arguments"/>
    </div>
    <div class="packSelectContainer"><!-- <TestPackSelect/> --></div>
</div>
</template>

<script>
export default {
    name: "Page",

    props: ["name", "testPacksData"],

    data() {
        return {
            /*
            name: "Edit Profile",
            testPacks: [{
                id: "Destructive Test",
                fields2: [
                    {
                        name: "identifier",
                        attributes: {
                            type: "text"
                        }
                    },
                    {
                        name: "forms",
                        many: [
                            {
                                name: "sumbit",
                                description: "Button to click to sumbit form"
                            },
                            {
                                name: "inputs",
                                many: [
                                    {
                                        name: "element"
                                    },
                                    {
                                        name: "inputType",
                                        type: "dropdown"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                fields: {
                    "identifier": {
                        type: "text"
                    },
                    "forms": [{
                        "submit": {},
                        "inputs": [{
                            "element": {},
                            "inputType": {
                                "id": {
                                    type: "dropdown"
                                }
                            }
                        }]
                    }]
                }
            }],
            testPacksData: [{
                id: "Destructive Test",
                values: {
                    "identifier": "#username",
                    "forms": [{
                        "submit": "#submit",
                        "inputs": [
                            {
                                "element": "#username",
                                "inputType": {
                                    "id": "Random",
                                    "parameters": {
                                        "randomness": 1234
                                    }
                                }
                            }
                        ]
                    }]
                }
            }]
        */
        }
    },

    computed: {
        
    },

    methods: {
    
    }
}
</script>

<style scoped>
</style>
