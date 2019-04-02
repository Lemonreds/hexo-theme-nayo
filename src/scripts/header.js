import dom from '@scripts/dom'
import scroll from '@scripts/scroll'
import Util from '@scripts/util'

exports.init = () => {

    if (Util.isMobile()) return;

    const _ = {
        dom: '.header-wrapper'
    }

    let node = dom.query(_.dom)
    let last = 0,
        current = 0

    scroll.addEvent(e => {

        current = window.pageYOffset
        if (current === 0) {
            // 到达顶部
            node.addClass('header-static')
                .removeClass(['header-fixed', 'slideUp', 'slideDown'])
        } else if (current - last > 0) {
            // 下滑            
            node.addClass(['header-fixed', 'slideUp'])
                .removeClass(['header-static', 'slideDown'])
        } else {
            // 上滑           
            node.addClass(['header-fixed', 'slideDown'])
                .removeClass(['header-static', 'slideUp'])
        }

        last = current
    })
}