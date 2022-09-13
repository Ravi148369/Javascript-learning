const slider={
    leftButton : document.querySelector('#js-left-icon'),
    rightButton : document.querySelector('#js-right-icon'),
    imageUrl : ["image1.jpg","image2.jpg","image3.jpg","image4.jpg","image5.jpg"],
    img : document.querySelector('img'),
    currentImageIndex:2,
    
    rightButton:function(){
        if(this.imageUrl.length-1==this.currentImageIndex){
            this.currentImageIndex=-1
        }
        this.img.src = `./images/${this.imageUrl[++this.currentImageIndex]}`
    },
    leftButton:function(){
        if(this.currentImageIndex==0){
            this.currentImageIndex=5    
        }
        this.img.src=`./images/${this.imageUrl[--this.currentImageIndex]}`
    }
}