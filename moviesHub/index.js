(function(){
    const root=document.querySelector('#js-root')   
    if(!root){
        return
    }
    const getElement=(element,count=1)=>{
        const elements=[]
        if(count==1){
            return document.createElement(element)
        }
        for(let i=0;i<count;i++){
           elements.push(document.createElement(element))
        }
        return elements
    }
    const body=document.createElement('main')
    body.classList.add('align')
    const product={
        render:function(){
            this.body()
            root.append(body)
        },
        body:function(){
            const bodySection=getElement('section')
            bodySection.classList.add('flexBox')
            const request = new XMLHttpRequest();
            request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
            request.onload = function () {
                let data=''
                try{
                    data = JSON.parse(this.response)
                }catch(error){
                    console.log("data not found");
                }
                data.map(value =>{
                    const card = getElement('section')
                    const imagediv = getElement('div')
                    const title = getElement('h3')
                    const [description, directorName, produceName, releaseYear, runningTime]=getElement('p', 5)
                    const img=document.createElement('img')

                    card.classList.add('card')
                    img.src=value.image
                    img.alt="not found"

                    runningTime.textContent=` Runtime ${value.running_time} minuts`
                    releaseYear.textContent=`Release year : ${value.release_date}`
                    directorName.textContent=`Director : ${value.director}`
                    produceName.textContent=`Producer : ${value.producer}`
                    title.textContent = value.title
                    description.textContent=value.description
                    imagediv.append(img)
                    card.append(imagediv, title,description,directorName,produceName,releaseYear,runningTime)
                    bodySection.append(card)
                })
                body.append(bodySection)                
            }
            request.send()
        }
    }
    product.render()

})()