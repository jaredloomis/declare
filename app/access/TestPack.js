import TestPack    from "../model/TestPack"
import Page        from "../model/Page"
import accountAuth from "./validation/accountAuth"

export default {
    testPacks({user}) {
        accountAuth(user, null, {validateEntity: false})
        
        if(user.isSuperAdmin())
            return TestPack.find({})
        else
            return TestPack.find({owner: user.owner})
    },

    async testPack({id}, {user}) {
        const pack = await TestPack.findById(id)
        accountAuth(user, pack)
        return pack
    },


    createTestPack(testPack, {user}) {
        accountAuth(user, null, {validateEntity: false})

        if(!user.isSuperAdmin()) {
            throw {
                message: "Must be super user to create test pack."
            }
        }

        if(typeof(testPack.fields) === "string") {
            testPack.fields = JSON.parse(testPack.fields)
        }
        return new TestPack(testPack).save()
    },

    async setBaselineScreenshot({pageID, packID, image}, {user}) {
        const page = await Page.findOne({_id: pageID})
        accountAuth(user, page)
        page.setPackDatum(packID, "baselineScreenshot", image)
        await page.save()
        return page
    }
}
