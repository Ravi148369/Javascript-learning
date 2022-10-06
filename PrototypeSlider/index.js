(function () {
    const imageSrc = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg']
    const image = document.querySelector('.image-div img')
    const icon = document.querySelector('.icons')
    const navigate = document.querySelectorAll('.navigate p')

    function Move(position = 0) { 
        position == -1 ? position = 0 : ''
        if(navigate[position]){
            navigate[position].style.color = '#fff'
        }
        this.left = function () {
            if (position != 0) {
                image.src = `./images/${imageSrc[--position]}`
                if(navigate[position]){
                    navigate[position].style.color = '#fff'
                    navigate[position + 1].style.color = 'rgba(255, 255, 255, 0.351)'
                }
            }
        }
        this.right = function () {
            if (position != imageSrc.length - 1) {
                image.src = `./images/${imageSrc[++position]}`
                if(navigate[position]){
                    navigate[position].style.color = '#fff'
                    navigate[position - 1].style.color = 'rgba(255, 255, 255, 0.351)'
                }
            }
        }
    }

    const imageIndex = imageSrc.findIndex(value => image.src.includes(value))
    const moveImage = new Move(imageIndex)
    if (icon) {
        icon.addEventListener('click', (e) => {
            if (e.target.dataset.name == 'js-left') {
                moveImage.left()
            }
            else if (e.target.dataset.name == 'js-right') {
                moveImage.right()
            }
        })
    }
})()