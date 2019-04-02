function mask() {

    let mask = document.createElement('div')
    mask.className = 'mask none'

    document.body.appendChild(mask)

    let event = []

    mask.addEventListener('click', () => {
        event.forEach(funs => {
            funs && funs()
        })
    })


    return {
        show() {
            mask.addClass('block').removeClass('none')
            return this
        },
        hide() {
            mask.addClass('none').removeClass('block')
            return this
        },
        addHideEvent(funs) {
            return event.push(funs) - 1
        },
        clear() {
            event = []
        }
    }
}

export default mask()