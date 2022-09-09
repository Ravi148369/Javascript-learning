function render(element){
    for (let i=0;i<element.childElementCount;i++){
        if(i==1){            
            element.children[i].style.color='red'
            if(element.children[i].childElementCount==1){
                element.children[i].children[0].style.color='black' 
            }
        }
        render(element.children[i])
    }

}
render(document.querySelector('ul'))
