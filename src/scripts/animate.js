module.exports = {
    init:
        /**
         * 首页文章渐入效果
         */
        function initArticleScroll() {

            //set elements
            let obj = $('.article'),
                objH = $('.article').outerHeight();

            let animate = 'scrollIn';

            // get window params
            let wH = $(window).height(),
                wScrollTop = $(window).scrollTop();


            // get offset top of elements
            let offsetTop = [];
            for (let i = 0; i < obj.length; i++) {

                offsetTop.push(obj.eq(i).offset().top + (objH / 3));

            }

            // the frist elements    
            obj.eq(0).addClass(animate);


            // check (is visible in window ? ) 
            function judgeScroll() {

                for (let j = 1; j < offsetTop.length; j++) {
                    if (offsetTop[j] < (wScrollTop + wH)) {
                        for (let k = 0; k <= j; k++) {
                            obj.eq(k).addClass(animate);
                        }
                    }
                }
            }
            // init
            judgeScroll();

            // update window params
            $(window).scroll( ()=> {
                wH = $(window).height();
                wScrollTop = $(window).scrollTop();
                judgeScroll();
            });
        }
}