document.addEventListener('DOMContentLoaded',()=>{

    const showButton=document.querySelector('section > button')
    const closeIcon=document.querySelector('.modal i')
    const closeButton=document.querySelector('.btn-div button:first-child')
    const modalBox=document.querySelector('.modal-box')
    
    const  closeModel = () => {
        modalBox.style.display = 'none'
    }

    closeIcon.addEventListener('click',closeModel)
    closeButton.addEventListener('click',closeModel)

    showButton.addEventListener('click',()=>{
        modalBox.style.display='flex'
    })

    modalBox.addEventListener('click',(e)=>{
        if(e.target == modalBox){
            closeModel()
        }
    })

})