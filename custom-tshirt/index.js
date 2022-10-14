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
            canvas.width = this.measureTextWidth(text, '16px verdana') + 20
            canvas.addEventListener('click',()=> {
                customTshirt.canvasContext =  canvas
                customTshirt.textCanvas = text
            })
            ctx.font = '16px verdana'
            ctx.fillText(text, 10, 13)
            this.dragCanvas(canvas)
            canvas.addEventListener('dragstart',(e)=>{
                this.layerX = e.layerX
                this.layerY = e.layerY
                this.canvasContext = canvas
            })
            
            this.canvasDiv.append(canvas)
        },
        inputText: function() {
            const input = document.querySelector('#js-input-text')
            input.style.display = 'block'   
        },
        bind: function() {
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
            const fontSizeInput = document.querySelector('input[type = range]')
            const small = document.querySelector('small')
            small.textContent = fontSizeInput.value
            document.querySelector('input[type = range]').addEventListener('input',(e)=>{
                small.innerText = e.target.value
                const ctx = this.canvasContext.getContext('2d')
                ctx.clearRect(0, 0, this.canvasContext.width, this.canvasContext.height);
                this.canvasContext.width = this.measureTextWidth(this.textCanvas, `${e.target.value}px verdana`) + 20
                this.canvasContext.height = e.target.value
                ctx.font = `${e.target.value}px verdana`
                ctx.fillText(this.textCanvas, 10, e.target.value-2)
            })
            this.canvasDiv.addEventListener('dragover',(e)=> {
                this.canvasContext.style.top = `${e.clientY - 102 - this.layerY}px`
                this.canvasContext.style.left = `${e.clientX - 158 - this.layerX}px`
            })           
            const addTextbtn = document.querySelector('#js-add-txt')
            addTextbtn.addEventListener('click',customTshirt.inputText)
        },
        measureTextWidth: function(text, font) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            ctx.font = font
            return ctx.measureText(text).width
        },
        setFontSize: function(fontSize)  {
            const ctx = this.textCanvas
            console.log(ctx.text);
        },
        dragCanvas: function() {
            
        }
    }
    customTshirt.bind()
    customTshirt.addImage('./images/tshirt.jpg',500, 500, customTshirt.canvasDiv, false)
    
})()