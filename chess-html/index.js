const div=document.getElementById('chess');
for(let i=0;i<8;i++){
    let row=document.createElement('div')
    row.className='row'
    for(let j=0;j<8;j++){
        let column=document.createElement('div')
        column.className='column'
        row.appendChild(column)
        if(i%2==0&&j%2==1){
            column.style.backgroundColor='black'
        }
        else if(i%2==1&&j%2==0){
            column.style.backgroundColor='black'
        }
    }
    div.appendChild(row)
}
const table=document.getElementById('chess1');
for(let i=0;i<8;i++){
    let row=document.createElement('tr')
    row.className='row'
    for(let j=0;j<8;j++){
        let column=document.createElement('td')
        column.className='column'
        row.appendChild(column)
        if(i%2==0&&j%2==1){
            column.style.backgroundColor='black'
        }
        else if(i%2==1&&j%2==0){
            column.style.backgroundColor='black'
        }
    }
    table.appendChild(row)
}

