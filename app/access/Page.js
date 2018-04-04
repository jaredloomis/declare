import Page          from "../model/Page"
import TestPack      from "../model/TestPack"
import TestPackData  from "../model/TestPackData"
import Report        from "../model/Report"
import Link          from "../model/Link"
import {executePack} from "../worker/executor"

export default {
    /*
     * Queries
     */

    pages({user}) {
        // Check if user has access        
        if(!user) {
            throw {
                message: "You don't have permission to access pages."
            }
        }

        // For super admin, send all pages. Otherwise
        // find pages in account
        if(user.isSuperAdmin()) {
            return Page.find({})
        } else {
            return Page.find({owner: user.owner})
        }
    },

    async page({id}, {user}) {
        const page = await Page.findById(id)

        // Check if page exists with id
        if(!page) {
            throw {
                message: `Page not found with id \"${id}\"`
            }
        }

        // Check if user has access
        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "Cannot access page not in your account."
            }
        }

        return page
    },

    /*
     * Mutations
     */

    createPage(page, {user}) {
        page.owner = user.owner
        return new Page(page).save()
    },

    async removePage({pageID}, {user}) {
        const page = await Page.findById(pageID)

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to delete this page."
            }
        }

        page.remove()
        return page
    },

    async executePack({pageID, packID}, {user}) {
        const page = await Page.findById(pageID)

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
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

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
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

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
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

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
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

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
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

        if(!(user && (user.owner.equals(page.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        if(link) {
            if(linkID) {
                page.updateLink(linkID, link)
            } else {
                page.links = page.links.concat([new Link(link)])
            }
        } else {
            page.links = page.links.filter(l => l._id.equals(linkID))
        }

        return page.save().exec()
    },

    async updateInfo({id, page}, {user}) {
        const pageModel = await Page.findById(id)

        if(!(user && (user.owner.equals(pageModel.owner) || user.isSuperAdmin()))) {
            throw {
                message: "You don't have permission to modify this page."
            }
        }

        const update = {
            startURL: page.startURL
        }

        await pageModel.update(update)
        return pageModel
    }
}
