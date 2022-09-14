(function () {
    const btn1 = document.querySelector('#button1')
    if (btn1) {
        btn1.addEventListener('click', () => {
            if (btn1.dataset.machine == 0) {
                btn1.textContent = 'machine is on'
                btn1.dataset.machine = 1
                return
            }
            if (btn1.dataset.machine == 1) {
                btn1.textContent = 'machine is off'
                btn1.dataset.machine = 0
            }
        })
    }
})();