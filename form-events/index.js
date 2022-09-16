(function(){
    const validinput=document.querySelector('#validinput')
    const onkeyup = document.querySelector('#js-input-text1')
    const onkeydown = document.querySelector('#js-input-text2')
    const select = document.querySelector('#js-select-option')
    const form = document.querySelector('form')
    const para =  document.querySelector('#para')
    const small=document.querySelector('small')
    // const searchInput=document.querySelector('input[type="search"]')
    form.addEventListener('submit', () => {
        alert('form submitted')
    })
    select.addEventListener('change', (e) => {
        para.textContent="change event " + e.target.value
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log("submit event");
    })
    form.addEventListener('reset', () => {
        console.log("reset event");
    })

    onkeyup.addEventListener('select', () => {
        para.textContent+="select event"
    })
    form.addEventListener('focusin', () => {
        form.style.boxShadow = '2px 2px 8px yellow'
    })
    form.addEventListener('focusout', () => {
        form.style.boxShadow = ''
    })

    onkeyup.addEventListener('focus', () => {
        console.log("focus event");
    })
    onkeyup.addEventListener('blur', () => {
        console.log("blur event")
    })
    onkeyup.addEventListener('change', () => {
        console.log('onchange event')
    })
    onkeydown.addEventListener('keydown', () => {
        para.textContent=onkeydown.value;
    })
    onkeyup.addEventListener('keyup', () => {
        para.textContent=onkeyup.value;
    })

    form.addEventListener('contextmenu',()=>{
        para.textContent='context menu'
    })
    validinput.addEventListener('invalid',()=>{
        small.style.display='block'
    })
    // searchInput.addEventListener('search',(e)=>{
    //     para.textContent='you have search '+e.target.value
    // })
})()