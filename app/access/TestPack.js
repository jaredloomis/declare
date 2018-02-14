import TestPack from "../model/TestPack"
import Page     from "../model/Page"

export default {
    testPacks({user}) {
        // Check if user has access
        if(!user || !user.isSuperAdmin()) {
            throw {
                message: "Must be a super admin to access all test packs."
            }
        }
        
        return TestPack.find({})
    },

    async testPack({id}, {user}) {
        const pack = await TestPack.findById(id)

        // Check if test pack exists with id
        if(!pack) {
            throw {
                message: `TestPack not found with id \"${id}\"`
            }
        }
        // Check if user has access
        if(!user || pack.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Cannot access test packs not in your account."
            }
        }

        return pack
    },


    createTestPack(testPack, {user}) {
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

        // Check if user has access
        if(!user || page.owner !== user.owner && !user.isSuperAdmin()) {
            throw {
                message: "Don't have permission to modify page."
            }
        }

        page.setPackDatum(packID, "baselineScreenshot", image)
        await page.save()
        return page
    }
}
