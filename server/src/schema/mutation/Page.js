import {
    GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull
} from "graphql"

import {Page as PageModel}     from "declare-db"
import PageAccess    from "../../access/Page"
import {TestPack}      from "declare-db"
import {Link}          from "declare-db"

import CanError, {wrapExceptional} from "../GraphQLCanError"

export default {
    createPage: {
        type: CanError(PageModel.graphQL),
        args: {
            name: {
                name: "name",
                type: new GraphQLNonNull(GraphQLString)
            },
            product: {
                name: "product",
                type: new GraphQLNonNull(GraphQLID)
            },
            startURL: {
                name: "startURL",
                type: GraphQLString
            },
            testPackData: {
                name: "testPackData",
                type: new GraphQLList(GraphQLID)
            }
        },
        resolve(obj, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.createPage(args, {user: state.user})
            )
        }
    },
    removePage: {
        type: CanError(PageModel.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(object, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.removePage(args, {user: state.user})
            )
        }
    },
    executePack: {
        type: CanError(TestPack.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            packID: {
                name: "packID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.executePack(args, {user: state.user})
            )
        }
    },
    addTestPack: {
        type: CanError(PageModel.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            packID: {
                name: "packID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.addTestPack(args, {user: state.user})
            )
        }
    },
    removeTestPack: {
        type: CanError(PageModel.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            packID: {
                name: "packID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.removeTestPack(args, {user: state.user})
            )
        }
    },
    updatePackData: {
        type: CanError(PageModel.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            data: {
                name: "data",
                type: GraphQLString
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.updatePackData(args, {user: state.user})
            )
        }
    },
    addLink: {
        type: CanError(PageModel.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            link: {
                name: "link",
                type: Link.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.addLink(args, {user: state.user})
            )
        }
    },
    updateLink: {
        type: CanError(PageModel.graphQL),
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            },
            linkID: {
                name: "linkID",
                type: GraphQLID
            },
            link: {
                name: "link",
                type: Link.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.updateLink(args, {user: state.user})
            )
        }
    },
    updatePageInfo: {
        type: CanError(PageModel.graphQL),
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            },
            page: {
                name: "page",
                type: PageModel.graphQLInput
            }
        },
        resolve(parent, args, {state}) {
            return wrapExceptional(() =>
                PageAccess.updateInfo(args, {user: state.user})
            )
        }
    }
}
