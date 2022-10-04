(function(){
    const crypto = {
        tbody: document.querySelector('#js-table-body'),
        viewButton: document.querySelector('.view-more-btn'),
        main: document.querySelector('main'),
        input: document.querySelector('input'),
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
            this.request.open('get', 'https://api.coincap.io/v2/assets', true)
            this.request.onload = function(){
                if(this.status == 200){
                    try{
                        crypto.data = (JSON.parse(this.response)).data
                        const renderData = crypto.data.slice(0,count)
                        crypto.tbody.innerHTML = ''
                        renderData.forEach(value => {
                            crypto.render(value)
                        })
                    }catch(error){
                        console.log('error' + error);
                    }
                }
                else{
                    crypto.notFound()
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
            // Nine Zeroes for Billions
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            return Math.abs(Number(labelValue)) >= 1.0e+9

                ? formatter.format((Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2))  + "B"
                // Six Zeroes for Millions 
                : Math.abs(Number(labelValue)) >= 1.0e+6

                ? formatter.format((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2))  + "M"
                // Three Zeroes for Thousands
                : (Math.abs(Number(labelValue)) >= 1.0e+3) 

                ? formatter.format((Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2)) + "K"

                : Math.abs(Number(labelValue)).toFixed(2) ;
        },
        // getChart(id){
        //     let chartData = ''
        //     fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
        //     .then(value=>value.json()
        //     .then(value=>chartData = value.data.slice(-6))
        //     )
        //     const labels = [
        //         '29-09-2022',    
        //         '30-09-2022',
        //         '01-10-2022',
        //         '02-10-2022',
        //         '03-10-2022',
        //         '04-10-2022'
        //       ];
            
        //     const data = {
        //         labels: labels,
        //         datasets: [{
        //             label: 'PRIZE',
        //             backgroundColor: 'rgb(255, 99, 132)',
        //             borderColor: 'rgb(255, 99, 132)',
        //             data: [19016, 19736, 19125, 19397, 19530, 19334],
        //         }]
        //     };
        
        //     const config = {
        //         type: 'line',
        //         data: data,
        //         options: {}
        //     };
        //     const mychart = new Chart(document.querySelector('#chart'),config)
        // }
    }
    crypto.getData()
    crypto.addListeners()
    // crypto.getChart()
})()