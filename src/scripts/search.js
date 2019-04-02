function ajax(options) {

    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                options.success && options.success(xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }

    xhr.open('GET', options.url, true)
    xhr.send(null)
}


import dom from '@scripts/dom'
import Util from '@scripts/util'
import Mask from '@scripts/mask'


exports.init = () => {

    const _ = {
        search: '#search',
        menuLink: '#menu-search',
        moblieLink: '.mobile-menu-search',
        cancel: '#search-cancel',
        input: '#search-input',
        result: '#search-result',
        showClass: ['show'],
        hideClass: ['none']
    }

    const search = dom.query(_.search),
        cancel = dom.query(_.cancel),
        menuLink = dom.query(_.menuLink)

    const showSearch = () => {
        Mask.show()

        search.addClass(_.showClass)
            .removeClass(_.hideClass)
    }

    const hideSeach = () => {
        Mask.hide()

        search.addClass(_.hideClass)
            .removeClass(_.showClass)
    }

    menuLink.addEventListener('click', showSearch)
    cancel.addEventListener('click', hideSeach)

    if (Util.isMobile()) {
        dom.query(_.moblieLink).addEventListener('click', showSearch)
    }

    fetch('/search.xml', _.input, _.result)
}



/**
 * 发起AJAX请求
 * 获取文档
 */
function fetch(path, input, result) {
    ajax({
        url: path,
        success: xml => {

            /**
             * 对数据进行过滤
             */
            const data = xml.querySelectorAll('entry').map(entry => {
                let title = entry.children[0].textContent,
                    content = Util.filterHTML(entry.children[2].textContent),
                    href = entry.children[1].attributes[0].nodeValue
                return {
                    title,
                    content,
                    href
                }
            })

            /**
             * 插入数据
             */

            const $input = dom.query(input)
            const $result = dom.query(result)

            $input.addEventListener('input', function () {


                let str = ''
                let key = this.value.trim().toLowerCase().split(/[\s\-]+/)


                $result.innerHTML = ''

                if (key.length <= 0) return;

                let isMatch = true

                data.forEach(data => {


                    if (!data.title || data.title.trim() === '') {
                        data.title = 'Untitled'
                    }

                    let data_title = data.title.trim().toLowerCase()
                    let data_content = data.content.trim().toLowerCase()
                    let data_href = data.href

                    let index_title = -1
                    let index_content = -1
                    let first_occur = -1

                    if (data_content !== '') {
                        key.forEach(function (keyword, i) {

                            index_title = data_title.indexOf(keyword)
                            index_content = data_content.indexOf(keyword)

                            if (index_title < 0 && index_content < 0) {
                                isMatch = false
                            } else {
                                if (index_content < 0) {
                                    index_content = 0
                                }
                                if (i == 0) {
                                    first_occur = index_content
                                }
                            }
                        })
                    } else {
                        isMatch = false
                    }



                    if (isMatch) {
                        str += '<div class=\'search-item\'>'
                        str += '<a href=\'' + data_href + '\' class=\'search-title\'>' + data_title + '</a>'
                        let content = data.content
                        if (first_occur >= 0) {
                            let start = first_occur - 40
                            let end = first_occur + 60

                            if (start < 0) {
                                start = 0
                            }
                            if (start == 0) {
                                end = 100
                            }
                            if (end > content.length) {
                                end = content.length
                            }

                            let match_content = content.substr(start, end)
                            key.forEach(function (keyword) {
                                let regS = new RegExp(keyword, 'gi')
                                match_content = match_content.replace(regS, '<span class="search-keyword">' + keyword + '</span>')
                            })

                            str += '<p class="search-content">' + match_content + '</p>'
                        }
                        str += '</div>'
                    }
                })


                if (str.indexOf('<div') === -1) $result.innerHTML = '<div class=\'iconfont icon-nofound search-empty\'>' + '</div>'
                else $result.innerHTML = str
            })
        }
    })
}