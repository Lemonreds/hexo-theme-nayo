import dom from '@scripts/dom'
import scroll from '@scripts/scroll'

exports.init = () => {

    const _ = {
        dom: '#toTop',
        showClass: 'leftIn',
        hideClass: 'rightOut'
    }

    const toTop = dom.query(_.dom)
    toTop.addEventListener('click', dom.moveSmooth)

    scroll.addEvent(() => {

        if (document.documentElement.scrollTop > 800) {
            toTop.addClass(_.showClass).removeClass(_.hideClass)
        } else {
            toTop.addClass(_.hideClass).removeClass(_.showClass)
        }
    })

}