import Promise from "bluebird"
import {spawn} from "child_process"

const readFile = Promise.promisify(require("fs").readFile)
const unlink   = Promise.promisify(require("fs").unlink)

// TODO Avoid intermediate output.mp4 file - can ffmpeg stream the output?
// : [Buffer] -> Promise Buffer
module.exports = frames => {
    const fileName = "output.mp4"

    // Spawn ffmpeg process
    const ffmpeg = spawn("ffmpeg", [
        "-f", "image2pipe",
        "-pix_fmt", "yuv420p",
        "-framerate", "1/5",
        "-i", "-",
        "-c:v", "libx264",
        "output.mp4"
    ])

    // Send frames to ffmpeg as stdin
    ffmpeg.stdin.write(Buffer.concat(frames))
    ffmpeg.stdin.end()

    return new Promise((resolve, reject) => {
        const errChunks = []

        // Listen for errors, keep a log
        //ffmpeg.stdout.on("data", chunks.push)
        ffmpeg.stderr.on("data", errChunks.push)

        // Once ffmpeg closes, check if output file exists. If
        // it does, read the file and resolve with the Buffer, then delete the file.
        // Otherwise, reject with the error output given by ffmpeg
        ffmpeg.on("close", code =>
            readFile(fileName)
                .then(video => {
                    unlink(fileName)
                    return video
                })
                .then(resolve)
                .catch(err => reject(Buffer.concat(errChunks)))
        )
    })
}
