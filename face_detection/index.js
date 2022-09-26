document.addEventListener('DOMContentLoaded',()=>{
    const video = document.querySelector('#video')
    const playButton = document.querySelector('#js-play-button') 
    const mediaDevice = navigator.mediaDevices
    
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models')
    ])
    .then(startVideo)
    function startVideo(){
        if(video && playButton){
            playButton.addEventListener('click',()=>{
                mediaDevice.getUserMedia({
                    video: true,
                    audio: false
                }).then(stream=>{
                    video.srcObject = stream
                    video.addEventListener('loadedmetadata',()=>{
                        video.play()
                    })
                }).catch("error")
            })
        }
    }
    video.addEventListener('play',()=>{
        const canvas=faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize={width:video.clientWidth,height:video.clientHeight}
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async()=>{
            const detection = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            console.log(detection);
            const resizedDetections = faceapi.resizeResults(detection,displaySize)
            canvas.getContext('2d').clearRect(0,0, canvas.width,canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        },10)
    })
})