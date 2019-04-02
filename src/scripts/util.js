module.exports = {
    isMobile() {
        const userAgentInfo = navigator.userAgent
        for (let agent of ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']) {
            if (userAgentInfo.indexOf(agent) > 0) return true
        }
        return false
    },
    isFunc(func) {
        return typeof func === 'function'
    },
    isStr(str) {
        return typeof str === 'string'
    },
    isNode(node) {
        return node.nodeType === Node.ELEMENT_NODE
    },
    isArray(arr) {
        return Array.isArray(arr)
    },
    filterHTML(str) {
        str = str.replace(/<\/?[^>]*>/g, '')
        str = str.replace(/[|]*\n/, '')
        str = str.replace(/&npsp;/ig, '')
        return str
    }

}