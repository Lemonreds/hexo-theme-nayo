/**
 * 
 * 
 * window scroll handler
 * 
 * 
 */
import Util from '@scripts/util'

class Scroll {

    constructor() {
        this.listener = []
        this.time = null
        this._init()
    }

    _init() {

        window.addEventListener('scroll', event => {
            if (this.time) {
                clearTimeout(this.time)
            }
            this.time = setTimeout(this._dispatch, 0, this.listener, event)
        })
    }


    _dispatch(listener, event) {
        listener.forEach(item => (item(event)))
    }


    addEvent(func) {

        if (!Util.isFunc(func)) throw new Error('params error.')


        this.listener.push(func)
    }

}

export default new Scroll()