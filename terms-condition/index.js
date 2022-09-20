(function () {
    const terms = document.querySelector('.terms')
    const button = document.querySelector('.btn')
    const model = document.querySelector('.model')
    const termButton = document.querySelector('button:first-child')
    const animation = (zoom, x = 0) => {
        if (x < zoom) {
            x += 0.10
            terms.style.transform = `scale(${x})`
            terms.style.transition = '200ms'
            setTimeout(() => {
                animation(zoom, x)
            }, 5);
        }
    }
    termButton.addEventListener('click', () => {
        model.style.display = 'flex'
        animation(1.01)
        terms.scrollTop = 0
    })
    document.addEventListener('click', (e) => {
        if (e.target == model) {
            model.style.display = 'none'
        }
    })

    function obCallback(payload) {
        if (payload[0].intersectionRatio === 1) {
            button.disabled = false;
            button.classList.add('accept')
            ob.unobserve(terms.lastElementChild);
        }
    }
    const ob = new IntersectionObserver(obCallback, {
        root: terms,
        threshold: 1
    });
    ob.observe(terms.lastElementChild.previousElementSibling)


})()