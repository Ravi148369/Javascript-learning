(function(){
    const li=document.querySelectorAll('li')
    function removeNode(e){
        e.stopPropagation() 
        e.target.remove()
    }
    li.forEach(value=>{
        value.addEventListener('click',removeNode)
    })
})