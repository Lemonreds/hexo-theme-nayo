let LazyLoad = (function () {


    const defaults = {
            src: 'data-src',
            nolazy: 'noLazyLoad'
        },
        root = window;

    function LazyLoad(images) {
        this.settings = defaults;
        this.images = images;
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function () {

            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            let self = this;
            let observerConfig = {
                root: null,
                rootMargin: "0px",
                threshold: [0]
            };

            this.observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.intersectionRatio > 0) {
                        self.observer.unobserve(entry.target);

                        let src = entry.target.getAttribute(self.settings.src);

                        if (src) {
                            if ("img" === entry.target.tagName.toLowerCase()) {

                                entry.target.src = src;
                                entry.target.removeAttribute(self.settings.src);
                            } else {
                                entry.target.style.backgroundImage = "url(" + src + ")";
                                entry.target.removeAttribute(self.settings.src);
                            }
                        }
                    }
                });
            }, observerConfig);


            this.images.forEach(image => {

                if (this.isNolazy(image)) {

                    let src = image.getAttribute(self.settings.src);

                    if (src) {
                        if ("img" === image.tagName.toLowerCase()) {

                            image.src = src;
                            image.removeAttribute(self.settings.src);
                        } else {
                            image.style.backgroundImage = "url(" + src + ")";
                            image.removeAttribute(self.settings.src);
                        }
                    }
                } else {
                    self.observer.observe(image);
                }
            });

        },

        loadImages: function () {
            if (!this.settings) {
                return;
            }

            let self = this;
            this.images.forEach(function (image) {
                let src = image.getAttribute(self.settings.src);
                if (src) {
                    if ("img" === image.tagName.toLowerCase()) {

                        image.src = src;
                        image.removeAttribute(self.settings.src);
                    } else {
                        image.style.backgroundImage = "url(" + src + ")";
                        image.removeAttribute(self.settings.src);
                    }
                }

            });
        },
        isNolazy: function (image) {
            return image.className.split(' ').indexOf(this.settings.nolazy) !== -1
        }
        // ,

        // destroy: function () {
        //     if (!this.settings) {
        //         return;
        //     }
        //     this.observer.disconnect();
        //     this.settings = null;
        // }
    };


    return LazyLoad;
})();


exports.init = () => {

    let imgs = document.getElementsByClassName('lazyload')

    HTMLCollection.prototype.forEach = function (cb) {
        Array.prototype.slice.call(this).forEach(cb);
    };

    new LazyLoad(imgs);

}