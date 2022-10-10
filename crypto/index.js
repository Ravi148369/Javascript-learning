(function(){
    const crypto = {
        tbody: document.querySelector('#js-table-body'),
        viewButton: document.querySelector('.view-more-btn'),
        input: document.querySelector('input'),
        loader: document.querySelector('#loader'),
        model: document.querySelector('.model'),
        data: 'ssjk',
        limit: 10,
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
        async fetchData(url){
            let data = ''
            await fetch(url).then(response=>{
                if(response.status == 200){
                    try{
                        data = response.json()
                    }catch(error){
                        console.log("given response is not JSON");
                    }
                }
                else{
                    this.handleStatus(response)
                }
            })
            return data
        },
        setData:async function(){
            this.loader.classList.add('loader')
            this.data = await this.fetchData('https://api.coincap.io/v2/assets')
            this.data = this.data.data
            if(this.data == ''){
                this.loader.classList.remove('loader')
                return
            }
            Array.isArray(this.data)?this.render(this.data,this.limit):''
            this.loader.classList.remove('loader')
        },
        render: function(data, limit){
            this.tbody.innerHTML = ''
            data.slice(0,limit).forEach(value=>{    
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
                    this.getChartData(value.id)
                })
                imgDiv.append(img,p)
                name.append(imgDiv)
                tr.append(rank, name, price, marketcap, vwap, supply, volume, change)
                this.tbody.append(tr)
            })
        },
        bind: function(){
            if(this.viewButton){
                this.viewButton.addEventListener('click',()=>{  
                    this.limit+=10
                    this.render(this.data.slice(0,this.limit))
                })
            }
            if(this.input){
                this.input.addEventListener('keyup',(e)=>{
                    if(this.data){
                        this.tbody.innerHTML = ''
                        this.data = this.data.filter(value=>value.name.toLowerCase().includes(e.target.value.toLowerCase()))
                        this.render(this.data,this.limit)
                        if(e.target.value == ''){
                            this.limit = 10
                            this.setData()
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
                :formatter.format(Math.abs(Number(labelValue)).toFixed(2)) ;
        },
        getChartData:async function(id){
            const canvasDiv = this.model.firstElementChild
            if(!canvasDiv){
                return
            }
            canvasDiv.innerHTML = ''
            const canvas = document.createElement('canvas')
            canvasDiv.append(canvas)
            const labels = []
            const prize = []
            let chartData = await this.fetchData(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
            chartData = chartData.data
            Array.isArray(chartData)?
                chartData.slice(-10).forEach(value=>{
                    prize.push(value.priceUsd)
                    labels.push(value.date.slice(0,10))
                }):''
            this.setChart(id, labels,prize,canvas)
        },
        setChart: function(id, labels, prize, canvas){
            const data = {
                labels: labels,
                datasets: [{
                    label: id,
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
        },
        handleStatus: function(response){
            console.log(response);
        }
    }
    crypto.setData()
    crypto.bind()
})()