import gql from "graphql-tag"

export default {
    category: {
        full: gql`
            fragment FullCategory on Category_CanError {
                data {
                    _id
                    name
                    parent
                    items
                    itemRef
                    children
                }
                error
            }`,
        minimalList: gql`
            fragment MinimalCategoryList on List_Category_CanError {
                data {
                    _id
                    name
                    parent
                    items
                    itemRef
                    children
                }
                error
            }`
    },
    page: {
        full: gql`
            fragment FullPage on Page_CanError {
                data {
                    _id
                    name
                    startURL
                    links {
                        _id
                        destination
                        navigation {
                            actionType
                            values
                        }
                    }
                    testPackData {
                        testPack
                        values
                        reports
                    }
                    customTests
                    testValues
                }
                error
            }`,
        minimalList: gql`
            fragment MinimalPageList on List_Page_CanError {
                data {
                    _id
                    name
                }
                error
            }`
    },
    element: {
        full: gql`
            fragment FullElement on Element_CanError {
                data {
                    _id
                    name
                    selector
                    inputType
                }
                error
            }
        `,
        fullList: gql`
            fragment FullElementList on List_Element_CanError {
                data {
                    _id
                    name
                    selector
                    inputType
                }
                error
            }`
    },
    report: {
        full: gql`
            fragment FullReport on Report_CanError {
                data {
                    _id
                    name
                    pageID packID
                    summary
                    steps {
                        status time message data children
                    }
                }
                error
            }`
    },
    customTest: {
        full: gql`
            fragment FullCustomTest on CustomTest_CanError {
                data {
                    _id
                    owner
                    name
                    actions {
                        actionType
                        values
                    }
                    reports
                }
                error
            }`,
        minimal: gql`
            fragment MinimalCustomTest on CustomTest_CanError {
                data {_id}
                error
            }
        `
    },
    inputType: {
        full: gql`
            fragment FullInputType on InputType_CanError {
                data {
                    _id
                    name
                    constraints {
                        regex
                        minLength
                        maxLength
                    }

                }
                error
            }`,
        fullList: gql`
            fragment FullInputTypeList on List_InputType_CanError {
                data {
                    _id
                    name
                    constraints {
                        regex
                        minLength
                        maxLength
                    }

                }
                error
            }`
    },
    testPack: {
        full: gql`
            fragment FullTestPack on TestPack_CanError {
                data {
                    _id
                    internalID
                    name
                    fields
                }
                error
            }`,
        minimalList: gql`
            fragment MinimalTestPackList on List_TestPack_CanError {
                data {
                    _id
                    name
                }
                error
            }`
    },
    account: {
        full: gql`
            fragment FullAccount on Account_CanError {
                data {
                    _id
                    users
                    pageCategories
                    elementCategories
                    inputTypeCategories
                }
                error
            }`
    },
    user: {
        full: gql`
            fragment FullUser on User_CanError {
                data {
                    _id
                    email
                    password
                    passwordSalt
                    owner
                }
                error
            }`
    }
}
