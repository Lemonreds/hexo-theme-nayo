import Style from '../css/_import/gallery.styl'

import Utils from './utils'

exports.init = () => {
    // 开启Gallery的格式
    let galleryElements = $('.banner,.gallery,img');
    new Gallery(galleryElements);
}



function Gallery(elements) {

    if (elements === '' || typeof (elements) == "undefined") {

        elements = document.getElementsByTagName('img');
    }

    this.config = {
            width: window.innerWidth * 0.66,
            height: window.innerHeight * 0.76
        },
        this.style = {
            container: 'gContainer',
            box: 'gBox gSlideDown',
            img: 'gImg'
        }
    this.elements = elements;
    this.init();
}

Gallery.prototype = {

    init: function () {
        if (Utils.isPc) {

            for (let i = 0; i < this.elements.length; i++) {

                this.elements[i].addEventListener('click', (() => {
                    this.show(this.elements[i]);
                }))
            }
        }
    },
    show: function (element) {

        let width = this.config.width,
            height = this.config.height;

        let style = this.style;

        if (element.height < 340 ||
            element.width < 340 ||
            element.height > height ||
            element.width > width) return;

        let gContainer = document.createElement('div'),
            gBox = document.createElement('div'),
            gImg = document.createElement('img');


        gContainer.className = style.container;
        gBox.className = style.box;
        gImg.className = style.img;


        let src = element.getAttribute('src');
        if (src) {
            gImg.src = element.getAttribute('src');
        } else {

            let bgr = element.style.backgroundImage,
                src = bgr.substring(6, bgr.length - 2);
            gImg.src = src;
        }

        this.setStyle([gBox, gImg], width, height);

        gBox.appendChild(gImg)
        gContainer.appendChild(gBox)
        gContainer.addEventListener('click', () => {
            this.destoryGallery()
        });


        document.getElementsByTagName('body')[0].appendChild(gContainer);
    },
    setStyle: function (elements, width, height, center) {

        elements.forEach(element => {
            let unit = 'px',
                style = element.style;

            style.width = width + unit;
            style.height = height + unit;

            style.marginTop = (height * -0.5) + unit;
            style.marginLeft = (width * -0.5) + unit;

        });
    },
    destoryGallery: function () {
        let gContainer = document.getElementsByClassName(this.style.container)[0]
        document.getElementsByTagName('body')[0].removeChild(gContainer)
    }
}