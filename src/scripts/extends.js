/**
 *  扩展了原生DOM集合方法
 *  使得其支持 forEach,map,filter
 */

NodeList.prototype.forEach = function (cb) {
    Array.prototype.slice.call(this).forEach(cb)
}

NodeList.prototype.map = function (cb) {
    return Array.prototype.slice.call(this).map(cb)
}

NodeList.prototype.filter = function (cb) {
    return Array.prototype.slice.call(this).filter(cb)
}


/**
 * 
 *扩展了原生NODE方法
 * 
 */

Node.prototype.addClass = function (className) {
    if (Array.isArray(className)) {
        this.classList.add(...className)
    } else {
        this.classList.add(className)
    }
    return this
}

Node.prototype.removeClass = function (className) {
    if (Array.isArray(className)) {
        this.classList.remove(...className)
    } else {
        this.classList.remove(className)
    }
    return this
}