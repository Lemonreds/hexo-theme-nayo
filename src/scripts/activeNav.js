import dom from '@scripts/dom'
import Util from '@scripts/util'

exports.init = () => {

    if (Util.isMobile()) return;

    const _ = {
        pages: ['home', 'archives', 'categories', 'tags', 'about'],
        acitveClass: 'menu-active',
        activeCurrent: 'home',
        prefixer: '#menu-'
    }

    let href = window.location.href

    for (let type of _.pages) {
        if (href.indexOf(type) !== -1) {
            _.activeCurrent = type
            break
        }
    }

    let activeItem = dom.query(_.prefixer.concat(_.activeCurrent))

    try {
        activeItem.addClass(_.acitveClass)
    } catch (err) {
        dom.query(_.prefixer.concat('home')).addClass(_.acitveClass)
    }
}