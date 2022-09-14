document.addEventListener('DOMContentLoaded',()=>{

    const red=document.querySelector('#red')
    const green=document.querySelector('#green')
    const blue=document.querySelector('#blue')
    const section=document.querySelector('.color')
    const span=document.querySelector('.rgb-span span')
    const copyIcon=document.querySelector('.rgb-span i')
    
    span.textContent=`rgb(${red.value},${green.value},${blue.value})`
    section.style.backgroundColor=`rgb(${red.value},${green.value},${blue.value})`

    copyIcon.addEventListener('click',()=>{
        navigator.clipboard.writeText(`${span.textContent}`).then(()=>{
            document.querySelector('.clipboard-text').style.display="block"
            setTimeout(() => {
                document.querySelector('.clipboard-text').style.display='none'    
            }, 1000);
        })
    })
    
    function onChange(){
        span.textContent=`rgb(${red.value},${green.value},${blue.value})`
        section.style.backgroundColor=`rgb(${red.value},${green.value},${blue.value})`
    }

    red.addEventListener('input',()=>onChange())
    green.addEventListener('input',()=>onChange())
    blue.addEventListener('input',()=>onChange())
})