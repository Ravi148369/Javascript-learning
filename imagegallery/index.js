(function () {
    const root = document.querySelector('#js-root')
    const model = document.querySelector('.model')
    const modelImage = document.querySelector('.model img')
    const modelView = document.querySelector('.model-image')
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image2.jpg', 'image5.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image2.jpg', 'image5.jpg']
    if (!root) {
        return
    }
    const animationZoomIn = (zoom, x = 0) => {
        if (x < zoom) {
            x += 0.10
            modelImage.style.transform = `scale(${x})`
            setTimeout(() => {
                animationZoomIn(zoom, x)
            }, 5);
        }
    }
    const animationZoomOut=(x=1)=>{
        if(x>0){
            x -= 0.10
            modelImage.style.transform = `scale(${x})`
            setTimeout(() => {
                animationZoomOut(x)
            }, 10);
        }
    }
    function clickModel(e){
        if(model){
            modelImage.src = e.target.src
            model.style.display = 'flex'
            animationZoomIn(.9)
        }
    }
    model.addEventListener('click',(e)=>{
        if(e.target==modelView){
            animationZoomOut()
            setTimeout(() => {
                model.style.display = 'none' 
            }, 100);
        }
    })
    for (let i = 0; i < images.length / 6; i++) {
        const imageSection = document.createElement('div')
        imageSection.classList.add('image-section')
        for (let j = i, k = 1; j < i + 6; j++, k++) {
            const imageDiv = document.createElement('div')
            const image = document.createElement('img')
            const desciption=document.createElement('div')

            desciption.classList.add('description-box')
            imageDiv.tabIndex=0
            imageDiv.classList.add(`grid${k}`,'image-div')
            image.src = `./images/${images[j]}`
            image.alt = "not found"
            desciption.textContent='imagediv'
            image.addEventListener('click',clickModel)
            imageDiv.append(image,desciption)
            imageSection.append(imageDiv)
        }
        root.append(imageSection)
    }
})()