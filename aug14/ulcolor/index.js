(
    function(){
        const list=document.querySelectorAll('ul li')
        if(list){
            list.forEach(value=>{
                if(value.firstElementChild){
                    value.addEventListener('click',()=>{
                        console.log(value.closest(ul).firstElementChild)
                        // console.log(value.firstElementChild.firstElementChild.style.color='red')
                    })
                }
            })
        }
    }
)()