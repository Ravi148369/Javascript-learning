(function(){

    const red=document.querySelector('#red')
    const green=document.querySelector('#green')
    const blue=document.querySelector('#blue')
    const section=document.querySelector('.color')
    const span=document.querySelector('.rgb-span span')
    const copyIcon=document.querySelector('.rgb-span i')
    const hexSpan=document.querySelector('.rgb-span:nth-child(3) span')
    const hexCopyIcon=document.querySelector('.rgb-span:nth-child(3) i')

    document.addEventListener('DOMContentLoaded',()=>{
        span.textContent=`rgb(${red.value},${green.value},${blue.value})`
        hexSpan.textContent=rgbToHex(red.value,green.value,blue.value)
        section.style.backgroundColor=`rgb(${red.value},${green.value},${blue.value})`

    })    
    function copyClipboard(text){
        navigator.clipboard.writeText(text).then(()=>{
            document.querySelector('.clipboard-text').style.display="block"
            setTimeout(() => {
                document.querySelector('.clipboard-text').style.display='none'    
            }, 1000);
        })
    }

    hexCopyIcon.addEventListener('click',()=>{
        copyClipboard(hexSpan.textContent)
    })

    copyIcon.addEventListener('click',()=>{
        copyClipboard(span.textContent)
    })

    
    function onChange(){
        span.textContent=`rgb(${red.value},${green.value},${blue.value})`
        hexSpan.textContent=rgbToHex(red.value,green.value,blue.value)
        section.style.backgroundColor=`rgb(${red.value},${green.value},${blue.value})`
    }

    function componentToHex(c) {
        var hex = c.toString(8);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    red.addEventListener('input',()=>onChange())
    green.addEventListener('input',()=>onChange())
    blue.addEventListener('input',()=>onChange())
})()