import pages         from "./Page"
import inputTypes    from "./InputType"
import elements      from "./Element"
import customTests   from "./CustomTest"
import categories    from "./Category"
import users         from "./User"
import errors        from "./Error"
import accounts      from "./Account"
import products      from "./Product"
import testRuns      from "./TestRun"
import reportBatches from "./ReportBatch"
import environments  from "./Environment"

export default (state, event) =>
    environments(reportBatches(testRuns(products(accounts(errors(users(categories(customTests(elements(inputTypes(pages(
        state, event), event), event), event), event), event), event), event), event), event), event), event)
