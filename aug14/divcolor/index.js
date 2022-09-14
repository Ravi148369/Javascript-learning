
(function () {
    const button = document.querySelectorAll("button")
    const div = document.querySelector('div')
    const colors = ['red', 'green', 'blue', 'yellow']

    function setColor(color) {
        if (div) {
            if (div.classList.length) {
                if (div.classList.contains(color)) {
                    return
                }
                colors.forEach(value => {
                    if (div.classList.contains(value)) {
                        div.classList.remove(value)
                    }
                })
                div.classList.add(color)
            }
            else {
                div.classList.add(color)
            }
        }
    }
    if (button) {
        button.forEach((value) => {
            value.addEventListener('click', () => {
                setColor(value.dataset.color)
            })
        })
    }
})();