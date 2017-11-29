import {
    GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull
} from "graphql"

import Page          from "../../model/Page"
import TestPack      from "../../model/TestPack"
import Report        from "../../model/Report"
import Link          from "../../model/Link"
import TestPackData  from "../../model/TestPackData"
import {executePack} from "../../worker/executor"

export default {
    /* Page Mutations */
    createPage: {
        type: Page.graphQL,
        args: {
            name: {
                name: "name",
                type: new GraphQLNonNull(GraphQLString)
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
        async resolve(obj, args) {
            return await new Page(args).save()
        }
    },
    removePage: {
        type: Page.graphQL,
        args: {
            pageID: {
                name: "pageID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(object, {pageID}) {
            return await Page.findByIdAndRemove(pageID)
        }
    },
    executePack: {
        type: TestPack.graphQL,
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
        async resolve(parent, {pageID, packID}) {
            executePack(pageID, packID)
            .then(async result => {
                try {
                const report = await new Report(result.report).save()
                const page = await Page.findOne({_id: pageID})
                page.addReport(packID, report._id)
                page.setPackData(packID, result.data)
                await page.save()
                } catch(ex) {
                    console.log(JSON.stringify(ex))
                }
            })
            return TestPack.findById(packID)
        }
    },
    addTestPack: {
        type: Page.graphQL,
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
        async resolve(parent, {pageID, packID}) {
            const data = new TestPackData({
                testPack: packID,
                values: {}
            })
            return await Page.findOneAndUpdate(
                {_id: pageID},
                {$addToSet: {testPackData: data}}
            )
        }
    },
    removeTestPack: {
        type: Page.graphQL,
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
        async resolve(parent, {pageID, packID}) {
            const page = await Page.findById(pageID)
            page.testPackData = page.testPackData.filter(dat =>
                dat.testPack.toString() !== packID
            )
            return await page.save()
        }
    },
    updatePackData: {
        type: Page.graphQL,
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
        async resolve(parent, {pageID, data}) {
            data = JSON.parse(data).map(pack => new TestPackData(pack))
            const page = await Page.findOneAndUpdate(
                {_id: pageID},
                {$set: {testPackData: data}}
            )
            return page
        }
    },
    addLink: {
        type: Page.graphQL,
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
        async resolve(parent, {pageID, link}) {
            const linkModel = new Link(link)
            return await Page.findOneAndUpdate(
                {_id: pageID},
                {$addToSet: {links: linkModel}}
            )
        }
    },
    updateLink: {
        type: Page.graphQL,
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
        async resolve(parent, {pageID, linkID, link}) {
            try {
            const page = await Page.findById(pageID)
            if(linkID) {
                page.updateLink(linkID, link)
            } else {
                page.links.push(new Link(link))
            }
            return await page.save()
            } catch(ex) {
                console.log(ex)
                return ex
            }
        }
    }
}
