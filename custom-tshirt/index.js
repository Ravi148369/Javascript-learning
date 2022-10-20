import MeasureTextWidth from "./components/MeasureTextWidth.js"
import SetFontSize from "./components/SetFontSize.js"

(function () {
    const customTshirt = {
        canvasDiv: document.querySelector('.image-section'),
        imageDiv: document.querySelector('#js-image-div'),
        fontDiv: document.querySelector('#js-font-div'),
        removeButton: document.querySelector('#js-remove-btn'),
        canvasContext: "",
        textCanvas: '',
        layerX: '',
        layerY: '',
        image: '',
        imageCanvas: '',
        addImage: function (imageSrc, width, height, element, isDragable = true) {
            const image = new Image(width, height)
            image.src = imageSrc
            image.onload = (e) => this.drawImage(e, element, isDragable, width, height)
        },
        drawImage: function (e, element, isDragable, width, height) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')
            canvas.width = width;
            canvas.height = height;
            const image = e.target
            if (isDragable) {
                canvas.classList.add('js-on-image')
                canvas.draggable = 'true'
                canvas.addEventListener('dragstart', (e) => {
                    this.setLayer(e.layerX, e.layerY)
                    this.imageCanvas = canvas
                    this.image = image
                    this.setCanvas('', canvas)
                    this.imageDiv.style.display = 'flex'
                    this.fontDiv.style.display = 'none'
                    this.removeButton.style.display = 'block'
                })
                canvas.addEventListener('click', () => {
                    this.fontDiv.style.display = 'none'
                    this.imageDiv.style.display = 'flex'
                    this.imageCanvas = canvas
                    this.image = image
                    this.removeButton.style.display = 'block'
                })
            }
            ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height)
            element.append(canvas)
        },
        addText: function (text) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.height = 15
            canvas.classList.add('js-on-image')
            canvas.draggable = true
            canvas.width = MeasureTextWidth(text, '16px verdana') + 20
            ctx.font = '16px verdana'
            ctx.fillText(text, 10, 13)
            this.setCanvas(text, canvas)
            canvas.addEventListener('dragstart', (e) => {
                this.setLayer(e.layerX, e.layerY)
                this.fontDiv.style.display = 'flex'
                this.imageDiv.style.display = 'none'
                this.removeButton.style.display = 'block'
                this.setCanvas(text, canvas)
            })
            canvas.addEventListener('click', () => {
                this.setCanvas(text, canvas)
                this.imageDiv.style.display = 'none'
                this.fontDiv.style.display = 'flex'
                this.removeButton.style.display = 'block'
            })
            this.canvasDiv.append(canvas)
        },
        bind: function () {
            const fontSmall = document.querySelector('#js-font-small')
            const imageHeightSmall = document.querySelector('#js-height-small')
            const imageWidthSmall = document.querySelector('#js-width-small')
            const fontSizeInput = document.querySelector('#js-font-size')
            const addTextbtn = document.querySelector('#js-add-txt')
            const imageHeightInput = document.querySelector('#js-image-height')
            const imageWidthInput = document.querySelector('#js-image-width')
            const image = document.querySelector('#js-image-input') 
            const input = document.querySelector('#js-input-text')
            fontSmall.textContent = fontSizeInput.value
            imageHeightSmall.textContent = imageHeightInput.value
            imageWidthSmall.textContent = imageWidthInput.value
            let height = imageHeightInput.value
            let width = imageWidthInput.value
            this.canvasDiv.addEventListener('click', (e) => {
                if (input.style.display == 'block' && e.target != input) {
                    if (!input.value.trim() == '') {
                        this.addText(input.value)
                        input.value = ''
                        input.style.display = 'none'
                    }
                }
            })
            image && image.addEventListener('change', (e) => {
                this.addImage(URL.createObjectURL(e.target.files[0]), 200, 200, this.canvasDiv)
            })
            fontSizeInput && fontSizeInput.addEventListener('input', (e) => {
                fontSmall.innerText = e.target.value
                if (this.canvasContext) {
                    SetFontSize(this.textCanvas, e.target.value, this.canvasContext)
                }
            })
            imageHeightInput && imageHeightInput.addEventListener('input', (e) => {
                imageHeightSmall.textContent = e.target.value
                if (this.canvasContext) {
                    height = e.target.value
                    this.setImageSize(width, height)
                }
            })
            imageWidthInput && imageWidthInput.addEventListener('input', (e) => {
                imageWidthSmall.textContent = e.target.value
                if (this.canvasContext && this.image) {
                    width = e.target.value
                    this.setImageSize(width, height)
                }
            })
            this.canvasDiv && this.canvasDiv.addEventListener('dragover', (e) => {
                this.canvasContext.style.top = `${e.clientY - 102 - this.layerY}px`
                this.canvasContext.style.left = `${e.clientX - 158 - this.layerX}px`
            })
            addTextbtn && addTextbtn.addEventListener('click', () => {
                const input = document.querySelector('#js-input-text')
                input.style.display = 'block'
            })
            this.removeButton && this.removeButton.addEventListener('click', () => {
                if (this.canvasContext) {
                    this.canvasContext.remove()
                    this.canvasContext = ''
                    this.imageDiv.style.display = 'none'
                    this.fontDiv.style.display = 'none'
                    this.removeButton.style.display = 'none'
                }
            })
        },
        setCanvas: function (text, canvas) {
            this.canvasContext = canvas
            this.textCanvas = text
        },
        setLayer: function (layerX, layerY) {
            this.layerX = layerX
            this.layerY = layerY
        },
        setImageSize: function (width, height) {
            this.imageCanvas.height = height
            this.imageCanvas.width = width
            const ctx = this.imageCanvas.getContext('2d')
            ctx.drawImage(this.image, 0, 0, width, height)
        }

    }
    customTshirt.bind()
    customTshirt.addImage('./images/tshirt.jpg', 500, 500, customTshirt.canvasDiv, false)
})()