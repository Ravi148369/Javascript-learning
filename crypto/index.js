(function(){
    const crypto = {
        tbody: document.querySelector('#js-table-body'),
        viewButton: document.querySelector('.view-more-btn'),
        main: document.querySelector('main'),
        input: document.querySelector('input'),
        loader: document.querySelector('#loader'),
        model: document.querySelector('.model'),
        select: document.querySelector('select'),
        request: new XMLHttpRequest(),
        data: '',
        count: 20,
        getElement: function getElement(element, count = 1){
            if(count == 1){
                return document.createElement(element)
            }
            const elements = []
            for(let i = 0;i < count; i++){
                elements.push(document.createElement(element))
            }
            return elements
        },
        getData: function(count = 20){
            this.loader.classList.add('loader')
            this.request.open('get', 'https://api.coincap.io/v2/assets', true)
            this.request.onload = (e)=>{
                if(e.target.status == 200){
                    try{
                        this.data = (JSON.parse(e.target.response)).data
                        const renderData = this.data.slice(0,count)
                        this.tbody.innerHTML = ''
                        this.loader.classList.remove('loader')
                        renderData.forEach(value => {
                            this.render(value)
                        })
                    }catch(error){
                        console.log('error' + error);
                    }
                }
                else{
                    this.notFound()
                }
            }
            this.request.onerror=function(){    
                crypto.notFound()
            }
            this.request.send()
        },
        render: function(value){
            const tr = this.getElement('tr')
            const img = this.getElement('img')
            const imgDiv = this.getElement('div')
            const p = this.getElement('p')
            const [rank, name, price, marketcap, vwap, supply, volume, change] = this.getElement('td', 8)
            img.src = `https://assets.coincap.io/assets/icons/${value.symbol.toLowerCase()}@2x.png`
            img.alt = value.id?? 'not found'
            rank.textContent = value.rank ?? "undefined"
            p.textContent = value.name ?? "undefined"
            price.textContent = `${this.converter(value.priceUsd) ?? "0"}` 
            marketcap.textContent = `${this.converter(value.marketCapUsd) ?? "0"}` 
            vwap.textContent = `${this.converter(value.vwap24Hr) ?? "0"}`
            supply.textContent = `${this.converter(value.supply) ?? "0"}`
            volume.textContent = `${this.converter(value.volumeUsd24Hr) ?? "0"}`
            change.textContent = `${parseFloat(value.changePercent24Hr).toFixed(2) ?? "0"}`
            value.changePercent24Hr < 0?change.classList.add('red'):change.classList.add('green')
            tr.addEventListener('click',()=>{
                this.getChart(value.id)
            })
            imgDiv.append(img,p)
            name.append(imgDiv)
            tr.append(rank, name, price, marketcap, vwap, supply, volume, change)
            this.tbody.append(tr)
        },
        addListeners: function(){
            if(this.viewButton){
                this.viewButton.addEventListener('click',()=>{
                    this.count+=20
                    this.getData(this.count)
                })
            }
            if(this.input){
                this.input.addEventListener('keyup',(e)=>{
                    if(this.data){
                        this.tbody.innerHTML = ''
                        this.data.forEach(value=>{
                            if(value.name.toLowerCase().includes(e.target.value.toLowerCase())){
                                this.render(value)
                            }
                        })
                        if(e.target.value == ''){
                            this.getData(this.count)
                        }
                    }
                })
            }
            if(this.model){
                this.model.addEventListener('click',(e)=>{
                    if(e.target == this.model){
                        window.scroll = 'scroll'
                        this.model.style.display = 'none'
                    }
                })
            }
            if(this.select){
                this.select.addEventListener('change',()=>{
                    this.getChart()
                })
            }
        },
        notFound: function(){
            if(this.main){
                this.main.innerHTML =''
                const status = this.getElement('h2')
                status.textContent = '404 NOT FOUND'
                this.main.append(status)
            }
        },
        converter: function(labelValue){
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            return Math.abs(Number(labelValue)) >= 1.0e+9
                ? formatter.format((Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2))  + "B"
                : Math.abs(Number(labelValue)) >= 1.0e+6
                ? formatter.format((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2))  + "M"
                : (Math.abs(Number(labelValue)) >= 1.0e+3) 
                ? formatter.format((Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2)) + "K"
                : Math.abs(Number(labelValue)).toFixed(2) ;
        },
        async getChart(id){
            const canvasDiv = this.model.firstElementChild
            if(!canvasDiv){
                return
            }
            canvasDiv.innerHTML = ''
            const canvas = document.createElement('canvas')
            canvasDiv.append(canvas)
            let chartData = ''
            const labels = []
            const prize = []
            await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
            .then(value=>value.json()
            .then(value=>chartData = value.data.slice(-10))
            )
            chartData.forEach(value=>{
                prize.push(value.priceUsd)
                labels.push(value.date.slice(0,10))
            })
            const data = {
                labels: labels,
                datasets: [{
                    label: "Prize",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: prize,
                }]
            };
            const config = {
                type: 'line',
                data: data,
                option:{}
            };
            this.model.style.display = 'flex'
            document.scroll = 'false'
            this.animationZoomIn(this.model.firstElementChild, 1)
            new Chart(canvas,config)
        },
        animationZoomIn(element, zoom, x = 0.5){
            if (x < zoom) {
                x += 0.10
                element.style.transform = `scale(${x})`
                setTimeout(() => {
                    this.animationZoomIn(element, zoom, x)
                }, 5);
            }
        }
    }
    crypto.getData()
    crypto.addListeners()
})()