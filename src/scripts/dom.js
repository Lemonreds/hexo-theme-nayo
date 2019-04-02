/**
 * 
 * DOM helper
 * 
 */

import Util from '@scripts/util'

const dom = {
    query(selector) {
        if (!Util.isStr(selector)) return Object.create(null)
        const res = document.querySelectorAll(selector)

        if (res.length === 1) return res[0]
        return res
    },
    addLoadEvent(fun) {
        var old = window.onload
        if (typeof window.onload != "function") {
            window.onload = fun
        } else {
            window.onload = function () {
                old()
                fun()
            }
        }
    },
    moveSmooth(node) {

        let offsetTop = 0

        if (Util.isNode(node)) {
            offsetTop = node.offsetTop
        }

        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        })
    }
}


module.exports = dom