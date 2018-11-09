import Stlye from '../css/style.styl'
import Index from './index.js'
import Anm from './animate.js'
import Mobile from './mobile.js'
import Search from './search.js'
import Post from './post.js'
import Hover from './hover.js'

import Gallery from './gallery.js'

import Lazyload from './lazyload'

const $ = require('expose-loader?$!./jquery.js')
$(function () {
    (funcs => {
        for (let fn of funcs) {
            fn.init()
        }
    })([Index, Mobile, Search, Anm, Post, Lazyload, Hover, Gallery])
})