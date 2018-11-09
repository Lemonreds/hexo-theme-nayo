//-----------
//slide-menu
//-----------

import Utils from './utils.js'

exports.init = () => {

    if (!Utils.isPc) {
        const $toggle = $('.mobile-toggle'),
            $menuSearch = $('.mobile-menu-search');
        let $mask;


        $toggle.click(() => {
            $mask = Utils.createMask();
            showMenu();
            for (let e of [$mask, $menuSearch]) {
                e.click(() => {
                    hideMenu();
                })
            }
        })
    }
}
//
// style in header.styl
//
const showMenu = function ($icon = $('.mobile-toggle'), $mask = $('.page-mask')) {

    $icon
        .removeClass('icon-menu')
        .addClass('icon-no-menu');

    $('.mobile-menu')
        .show()
        .removeClass('menuSlideOut')
        .addClass('menuSlideIn');

    $('.header')
        .removeClass('slide-left')
        .addClass('slide-right');

    $('.container')
        .removeClass('slide-left')
        .addClass('slide-right');

    $('#footer')
        .removeClass('slide-left')
        .addClass('slide-right');


    $mask.show();
}



const hideMenu = function ($icon = $('.mobile-toggle'), $mask = $('.page-mask')) {

    $icon
        .removeClass('icon-no-menu')
        .addClass('icon-menu');

    $('.mobile-menu')
        .removeClass('menuSlideIn')
        .addClass('menuSlideOut');

    $('.header')
        .removeClass('slide-right')
        .addClass('slide-left');
    $('.container')
        .removeClass('slide-right')
        .addClass('slide-left');

    $('#footer')
        .removeClass('slide-right')
        .addClass('slide-left');

    $mask.remove();
}