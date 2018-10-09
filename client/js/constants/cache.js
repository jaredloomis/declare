export const cacheExpiration = 1000 * 60

export function cacheExpired(timestamp) {
    if(!timestamp) return true
    return new Date().getTime() - timestamp.getTime() > cacheExpiration
}
