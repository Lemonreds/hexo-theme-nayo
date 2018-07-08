let cheerio = require('cheerio'),
    loadedImage = 4,
    placeHolder = '/images/placeholder.png';


function renderImg(source) {

    let $ = cheerio.load(source, {
            decodeEntities: false
        }),
        gallery = $('.gallery,.banner'),
        img = $('img');


    gallery.each((idx, element) => {

        let origin = $(element).attr('data-origin')

        if (origin && origin !== placeHolder) {

            $(element).attr({
                'data-src': origin
            });
            $(element).css('background-image', `url("${placeHolder}")`)
            $(element).addClass('lazyload')
        }
    });

    img.each((idx, element) => {

        if (idx > loadedImage) {
            let src = $(element).attr('src')

            if (src && src !== placeHolder) {
                $(element).attr({
                    'data-src': src,
                    'src': placeHolder
                });
            }
            $(element).addClass('lazyload')
        }

    });

    return $.html()
}

hexo.extend.filter.register('after_render:html', renderImg)