import Page          from "../model/Page"
import TestPack      from "../model/TestPack"
import TestPackData  from "../model/TestPackData"
import Report        from "../model/Report"
import Link          from "../model/Link"
import {executePack} from "../../worker/executor"

export default {
    /*
     * Queries
     */

    pages({user}) {
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all pages."
            }
        }
        
        return Page.find({})
    },

    async page({id}, {user}) {
        const ty = await Page.findById(id)

        // Check if page exists with id
        if(!ty) {
            throw {
                message: `Page not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || ty.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access input types not in your account."
            }
        }

        return ty
    },

    /*
     * Mutations
     */

    createPage(page) {
        return new Page(page).save()
    },

    async removePage({pageID}, {user}) {
        const page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to delete this page."
            }
        }

        page.remove()
        return page
    },

    async executePack({pageID, packID}, {user}) {
        const page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to execute tests on this page."
            }
        }

        executePack(pageID, packID)
        .then(async result => {
            const report = await new Report(result.report).save()
            page.addReport(packID, report._id)
            page.setPackData(packID, result.data)
            await page.save()
        })
        return TestPack.findById(packID)
    },

    async addTestPack({pageID, packID}, {user}) {
        const page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        const data = new TestPackData({
            testPack: packID,
            values: {}
        })
        return Page.findOneAndUpdate(
            {_id: pageID},
            {$addToSet: {testPackData: data}}
        )
    },

    async removeTestPack({pageID, packID}, {user}) {
        const page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        page.testPackData = page.testPackData.filter(dat =>
            dat.testPack.toString() !== packID
        )
        return page.save()
    },

    async updatePackData({pageID, data}, {user}) {
        let page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        if(typeof(data) === "string") {
            data = JSON.parse(data).map(pack => new TestPackData(pack))
        } else {
            data = data.map(pack => new TestPackData(pack))
        }
        page = await Page.findOneAndUpdate(
            {_id: pageID},
            {$set: {testPackData: data}}
        )
        return page
    },

    async addLink({pageID, link}, {user}) {
        const page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        const linkModel = new Link(link)
        return Page.findOneAndUpdate(
            {_id: pageID},
            {$addToSet: {links: linkModel}}
        )
    },

    async updateLink({pageID, linkID, link}, {user}) {
        const page = await Page.findById(pageID)

        if(!user || user.owner !== page.owner) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        if(linkID) {
            page.updateLink(linkID, link)
        } else {
            page.links.push(new Link(link))
        }
        return await page.save()
    }
}
