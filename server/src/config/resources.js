import path from "path"

export const resolveResource = (...path) =>
    path.join(["resources", ...path])
