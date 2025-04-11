export const formatAddress = (address:  `0x${string}` | undefined, prefixLen = 4, suffixLen = 4): string =>{
    if (!address || address.length < prefixLen + suffixLen) return 'Invalid Address'
    const prefix = address.slice(0, prefixLen)
    const suffix = address.slice(-suffixLen)
    const stars = '*'.repeat(3)
    return `${prefix}${stars}${suffix}`
}
