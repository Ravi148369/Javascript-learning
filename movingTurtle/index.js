(function () {
    const turtle = document.querySelector('.play')
    let x = 10
    let y = 10
    let width = window.innerWidth
    let height = window.innerHeight
    window.addEventListener('keydown', (e) => {
        let flip = false
        let rotate = 0
        if (!e.key.includes('Arrow')) {
            return
        }
        switch (e.key) {
            case "ArrowLeft": x -= 10, flip = true
                break
            case "ArrowRight": x += 10
                break
            case "ArrowUp": y -= 10, rotate = -90
                break
            case "ArrowDown": y += 10, rotate = 90
        }
        if (x > width - 100) {
            x -= 10
        }
        else if (x <= 0) {
            x += 10
        }
        if (y > height - 100) {
            y -= 10
        }
        else if (y <= 0) {
            y += 10
        }
        turtle.setAttribute('style', `
            --rotateX: ${flip ? '180deg' : '0'};
            --x: ${x}px;
            --y: ${y}px;
            --rotate: ${rotate}deg;
        `);
    })
})()