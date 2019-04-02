import dom from '@scripts/dom'
import Util from '@scripts/util'
import Mask from '@scripts/mask'

exports.init = () => {

    if (!Util.isMobile()) return;

    const _ = {
        isShow: false,
        toggle: '#mobile-toggle',
        mobileMenu: '.mobile-menu',

        header: '.mobile-header-wrapper',
        container: '.container',
        footer: '.footer',

        menuShowClass: 'menuIn',
        menuHideClass: 'menuOut',

        pageShowClass: 'slideIn',
        pageHideClass: 'slideOut',

        hideToggleClass: 'icon-no-menu',
        showToggleClass: 'icon-menu',
    }

    const toggle = dom.query(_.toggle)
    const mobileMenu = dom.query(_.mobileMenu)
    const pageNodes = [dom.query(_.header), dom.query(_.container), dom.query(_.footer)]



    mobileMenu.addEventListener('click', hideMobileMenu)

    toggle.addEventListener('click', () => {
        _.isShow ? hideMobileMenu() : showMobileMenu()
    })


    function hideMobileMenu() {
        Mask.hide()

        toggle.addClass(_.showToggleClass)
            .removeClass(_.hideToggleClass)


        pageNodes.forEach(node => {
            node.addClass(_.pageShowClass)
                .removeClass(_.pageHideClass)
        })


        mobileMenu.addClass(_.menuHideClass)
            .removeClass(_.menuShowClass)

        _.isShow = false
    }


    function showMobileMenu() {
        Mask.show()


        toggle.addClass(_.hideToggleClass)
            .removeClass(_.showToggleClass)

        pageNodes.forEach(node => {
            node.addClass(_.pageHideClass)
                .removeClass(_.pageShowClass)
        })


        mobileMenu.addClass(_.menuShowClass)
            .removeClass(_.menuHideClass)

        _.isShow = true
    }

}