import Promise     from "bluebird"
const readFile = Promise.promisify(require("fs").readFile)

import encodeVideo from "../common/encodeVideo"

async function main() {
    const img1 = await readFile(__dirname + "/../../assets/sartre1.png")
    const img2 = await readFile(__dirname + "/../../assets/sartre2.png")
    return encodeVideo([img1, img2])
}

main()
    .then(buf  => console.log("[main out]", buf.toString()))
    .catch(err => console.log("[main err]", err.toString()))
