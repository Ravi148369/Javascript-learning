import MeasureTextWidth from "./components/MeasureTextWidth.js"
import SetFontSize from "./components/SetFontSize.js"
(function() {
    const customTshirt = {
        canvasDiv: document.querySelector('.image-section'),
        canvasContext: "",
        textCanvas:'',
        layerX:'',
        layerY: '',
        addImage: function(imageSrc, width, height, element, isDragable = true) {
            const image = new Image(width, height)
            image.src = imageSrc
            image.onload = (e)=>this.drawImage(e, element, isDragable, width, height)
        },
        drawImage: function(e, element, isDragable, width, height) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d') 
            canvas.width = width;
            canvas.height = height;  
            if(isDragable){
                canvas.classList.add('js-on-image')
                canvas.draggable = 'true'
                canvas.addEventListener('dragstart',(e)=> {
                    this.layerX = e.layerX
                    this.layerY = e.layerY
                    this.canvasContext = canvas
                })
            }
            ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height)
            element.append(canvas)
        },
        addText: function(text) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.height = 15
            canvas.classList.add('js-on-image')
            canvas.draggable = true
            canvas.width = MeasureTextWidth(text, '16px verdana') + 20
            canvas.addEventListener('click',()=> {
                customTshirt.canvasContext =  canvas
                customTshirt.textCanvas = text
            })
            ctx.font = '16px verdana'
            ctx.fillText(text, 10, 13)
            canvas.addEventListener('dragstart',(e)=>{
                this.layerX = e.layerX
                this.layerY = e.layerY
                this.canvasContext = canvas
            })
            this.canvasDiv.append(canvas)
        },
        bind: function() {
            const small = document.querySelector('small')
            const fontSizeInput = document.querySelector('#js-font-size')
            const addTextbtn = document.querySelector('#js-add-txt')
            small.textContent = fontSizeInput.value
            this.canvasDiv.addEventListener('click',(e)=>{
                const input = document.querySelector('#js-input-text')
                if(input.style.display == 'block' && e.target != input){
                    if(!input.value.trim() == ''){
                        this.addText(input.value)
                        input.value = ''
                        input.style.display = 'none'
                    }
                }
            })
            document.querySelector('#js-image-input').addEventListener('change',(e)=>{
                this.addImage(URL.createObjectURL(e.target.files[0]), 100, 100, this.canvasDiv)
            })
            fontSizeInput.addEventListener('input',(e)=>{
                small.innerText = e.target.value
                SetFontSize(this.textCanvas, e.target.value, this.canvasContext)
            })
            this.canvasDiv.addEventListener('dragover',(e)=> {
                this.canvasContext.style.top = `${e.clientY - 102 - this.layerY}px`
                this.canvasContext.style.left = `${e.clientX - 158 - this.layerX}px`
            })
            addTextbtn.addEventListener('click',()=> {
                const input = document.querySelector('#js-input-text')
                input.style.display = 'block'
            })
        }
    }
    customTshirt.bind()
    customTshirt.addImage('./images/tshirt.jpg',500, 500, customTshirt.canvasDiv, false)
})()