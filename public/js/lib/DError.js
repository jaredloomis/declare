/**
 * Error subclass with an additional metadata (Object) member
 */
export default class DError extends Error {
    constructor(message, meta, ...params) {
        super(message, ...params)
        this.meta = meta
        this.name = this.constructor.name
    }
}
