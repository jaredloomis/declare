import mongoose      from "mongoose"
import {Page}          from "declare-db"
import {TestPack}      from "declare-db"
import {TestPackData}  from "declare-db"
import {Report}        from "declare-db"
import {Link}          from "declare-db"
import {Category}      from "declare-db"
import {executePack} from "declare-executor/index"
import accountAuth   from "./validation/accountAuth"
import {EntityRef}    from "declare-common"

export default {
    /*
     * Queries
     */

    pages({user}) {
        accountAuth(user, null, {validateEntity: false})

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
        accountAuth(user, page)
        return page
    },

    /*
     * Mutations
     */

    createPage(page, {user}) {
        accountAuth(user, null, {validateEntity: false})
        page.owner = user.owner
        return new Page(page).save()
    },

    async removePage({pageID}, {user}) {
        const page = await Page.findById(pageID)
        accountAuth(user, page)

        // Remove page from category(ies)
        await Category.update({
            itemRef: EntityRef.page,
            items: {$in: [mongoose.Types.ObjectId(pageID)]}
        }, {
            $pull: {items: mongoose.Types.ObjectId(pageID)}
        })

        page.remove()
        return page
    },

    async executePack({pageID, packID}, {user}) {
        const page = await Page.findById(pageID)
        accountAuth(user, page)

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
        accountAuth(user, page)

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
        accountAuth(user, page)

        page.testPackData = page.testPackData.filter(dat =>
            dat.testPack.toString() !== packID
        )
        return page.save()
    },

    async updatePackData({pageID, data}, {user}) {
        let page = await Page.findById(pageID)
        accountAuth(user, page)

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
        accountAuth(user, page)

        const linkModel = new Link(link)
        return Page.findOneAndUpdate(
            {_id: pageID},
            {$addToSet: {links: linkModel}}
        )
    },

    async updateLink({pageID, linkID, link}, {user}) {
        const page = await Page.findById(pageID)
        accountAuth(user, page)

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
        accountAuth(user, pageModel)

        const update = {
            startURL: page.startURL
        }

        await pageModel.update(update)
        return pageModel
    }
}
