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
                    product
                    owner
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
                    product
                    owner
                }
                error
            }`
    },
    page: {
        full: gql`
            fragment FullPage on Page_CanError {
                data {
                    _id
                    product
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
                    product
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
                    product
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
                    product
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
                    status
                    startTime
                    steps {
                        status time message data children
                    }
                }
                error
            }`,
        fullList: gql`
            fragment FullReportList on List_Report_CanError {
                data {
                    _id
                    name
                    pageID packID
                    status
                    summary
                    startTime
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
                data {
                    _id
                    name
                }
                error
            }
        `,
        minimalList: gql`
            fragment MinimalCustomTestList on List_CustomTest_CanError {
                data {
                    _id
                    name
                }
                error
            }
        `
    },
    inputType: {
        full: gql`
            fragment FullInputType on InputType_CanError {
                data {
                    _id
                    product
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
                    product
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
                    focusProduct
                    owner
                }
                error
            }`,
        minimal: gql`
            fragment MinimalUser on User_CanError {
                data {
                    _id
                    email
                    focusProduct
                    owner
                }
                error
            }`,
        minimalList: gql`
            fragment MinimalUserList on List_User_CanError {
                data {
                    _id
                    email
                    focusProduct
                    owner
                }
                error
            }`
    },
    product: {
        full: gql`
            fragment FullProduct on Product_CanError {
                data {
                    _id
                    name
                    defaultEnvironment
                    pageCategories
                    elementCategories
                    inputTypeCategories
                    owner
                }
                error
            }`,
        minimal: gql`
            fragment MinimalProduct on Product_CanError {
                data {
                    _id
                    name
                }
                error
            }`,
        minimalList: gql`
            fragment MinimalProductList on List_Product_CanError {
                data {
                    _id
                    name
                }
                error
            }`
    },
    testRun: {
        full: gql`
            fragment FullTestRun on TestRun_CanError {
                data {
                    _id
                    name
                    description
                    tests {
                        testType
                        customTestID
                    }
                    environment
                    reportBatches
                }
                error
            }`,
        minimal: gql`
            fragment MinimalTestRun on TestRun_CanError {
                data {
                    _id
                    name
                    description
                    reportBatches
                    owner
                }
                error
            }`,
        minimalList: gql`
            fragment MinimalTestRunList on List_TestRun_CanError {
                data {
                    _id
                    name
                    description
                    reportBatches
                    owner
                }
                error
            }`
    },
    reportBatch: {
        full: gql`
            fragment FullReportBatch on ReportBatch_CanError {
                data {
                    _id
                    testRun
                    reports
                    startTime
                    passPercentage
                    owner
                }
                error
            }`
    },
    environment: {
        full: gql`
            fragment FullEnvironment on Environment_CanError {
                data {
                    _id
                    name
                    description
                    variables {
                        _id
                        identifier
                        value
                    }
                    owner
                }
                error
            }
        `,
        minimalList: gql`
            fragment MinimalEnvironmentList on List_Environment_CanError {
                data {
                    _id
                    name
                    description
                    owner
                }
                error
            }`
    },
}
