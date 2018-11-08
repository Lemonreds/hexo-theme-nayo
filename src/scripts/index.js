//----------
// index 
//----------


import Utils from './utils'

module.exports = {

    init: function () {
        initActiveMenu();
        listenerScroll();
    }
}

/**
 * 
 * 当前页面 header-menu-link 样式
 * 
 */
function initActiveMenu() {

    let href = window.location.href,
        acitveClass = 'header-menu-active',
        activeMenuItem = 'home';

    let pagesType = ['home', 'archives', 'categories', 'tags', 'about'];

    for (let type of pagesType) {

        if (href.indexOf(type) > 0) {
            activeMenuItem = type;
            break;
        }
    }

    let item = $('#header-menu-'.concat(activeMenuItem))
    item.length != 0 ? item.addClass(acitveClass) : $('#header-menu-home').addClass(acitveClass)
    
}


/**
 * 监听滚动条事件
 * - Header   上划下滑
 * - BacktoTop 显示隐藏
 */
function listenerScroll() {

    // 记录上次滑动的位置
    let last_scroll = 0,
        $backTop = $('#page-backTop');

    // 监听滚动条
    $(window).scroll(function () {
        resetHeader();
        resetBackToTop();
        last_scroll = $(window).scrollTop();
    });

    // 注册 BacktoTop 点击事件
    (function backTopClick() {
        $backTop.click(() => {
            $('html,body')
                .animate({
                    scrollTop: 0
                }, 600);
        });
    })();


    let resetBackToTop = function () {
        if ($(window).scrollTop() > 800) {

            $backTop.removeClass('rightOut').addClass('leftIn')

        } else if ($backTop.hasClass('leftIn')) {

            $backTop.removeClass('leftIn').addClass('rightOut')
        }
    };

    let resetHeader = function () {
        if (Utils.isPc) {
            let scroll = $(window).scrollTop(),
                last = last_scroll;
            //
            //  判断滚动条的位置
            //  1 未移动: fix Header
            //  2 下滑 :  hide Header
            //  3 上滑:  show Header
            scroll <= 0 ? fixedHeader() : ((scroll - last > 0) ? hideHeader() : showHeader());
        }
    }
}


/**
 * Header下滑
 */
function showHeader() {

    $('.header')
        .removeClass('header-static')
        .addClass('header-fixed')
        .addClass('slideDown')
        .removeClass('slideUp');

}

/**
 * Header上滑
 */
function hideHeader() {
    $('.header')
        .addClass('slideUp')
        .removeClass('slideDown');
}
/**
 * Header 固定
 */
function fixedHeader() {

    $('.header').addClass('header-static')
        .removeClass('header-fixed')
        .removeClass('slideUp')
        .removeClass('slideDown');
}

// just say hi....
console.log('Hexo Theme Nayo, By Lemonreds.');
console.log('@see [https://github.com/Lemonreds/hexo-theme-nayo]');