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
        full: gql`{
                _id
                name
                pageID packID
                summary
                steps {
                    status time message data children
                }
            }`
    }
}
