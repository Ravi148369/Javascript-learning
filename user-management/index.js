const users={
    date:new Date(),
    item:localStorage,
    tbody:document.querySelector('table tbody'),
    add:function(formData){
        const user={
            name:formData.name,
            username:formData.username,
            email:formData.email,
            mobile:formData.phone,
            status:"Inactive",
            isdeleted:false,
            created:this.date.toLocaleDateString()
        }
        if(!(formData.email==''||formData.name==''||formData.phone==''||formData.username=='')){
            this.item.setItem(this.item.getItem('key'),JSON.stringify(user))
            this.item.setItem('key',this.item.length-1)
            this.render()
            return
        }
        alert('please enter input correctly')
    },
    render:function(){
        this.tbody.innerHTML=''
        for(let i = 0,j=0;i < this.item.length-1; i++){
            const user = JSON.parse(this.item.getItem(i)) 
            if(!user.isdeleted){
                j++
                const tr = document.createElement("tr");
                const id = document.createElement("td");
                const name = document.createElement("td");
                const username = document.createElement("td");
                const email = document.createElement("td");
                const phone = document.createElement("td");
                const status = document.createElement("td");
                const created = document.createElement("td");
                const actions = document.createElement("td");
                const viewButton = document.createElement("button");
                const editButton = document.createElement("button");
                const removeButton = document.createElement("button");
                const statusButton = document.createElement("button");

                tr.id=`id${i}`
                id.textContent=j
                name.textContent=user.name
                username.textContent=user.username
                email.textContent=user.email
                phone.textContent=user.mobile
                status.textContent=user.status
                created.textContent=user.created

                viewButton.textContent='View'
                editButton.textContent='Edit'
                removeButton.textContent='Remove'
                statusButton.textContent="able"
                if(user.status=="Active"){
                    statusButton.textContent='disable'
                }
                viewButton.classList.add('bg-green')
                editButton.classList.add('bg-grey')
                removeButton.classList.add('bg-red')
                statusButton.classList.add('bg-yellow')

                viewButton.addEventListener('click',()=>{
                    this.view(i)
                })  

                editButton.addEventListener('click',()=>{
                    this.edit(i)
                })

                removeButton.addEventListener('click',()=>{
                    this.remove(i)
                })

                statusButton.addEventListener('click',()=>{
                    this.statusToggle(i)
                })

                actions.append(viewButton,editButton,removeButton,statusButton)
                tr.append(id,name,username,email,phone,status,created,actions)
                this.tbody.append(tr)
            }
        }
    },
    search:function(value){
        for(let i=0;i<this.item.length-1;i++){
            const user = JSON.parse(this.item.getItem(i))
            if(!user.isdeleted){
                if(user.username.toLowerCase().includes(value.toLowerCase())||user.email.toLowerCase().includes(value.toLowerCase())||user.name.toLowerCase().includes(value.toLowerCase())){
                    document.querySelector(`#id${i}`).style.display=''
                }
                else{
                    document.querySelector(`#id${i}`).style.display='none'
                }
            }
        }
    },
    statusToggle:function(id){
        const user = JSON.parse(this.item.getItem(id))
        if(user.status=='Active'){
            user.status="Inactive"
            this.item.setItem(id,JSON.stringify(user))
            this.render()
            return
        }
        user.status='Active'
        this.item.setItem(id,JSON.stringify(user))
        this.render()
        
    },
    remove:function(id){
        const user = JSON.parse(this.item.getItem(id))
        user.isdeleted=true
        this.item.setItem(id,JSON.stringify(user))
        this.render()
    },
    edit:function(id){
        const user = JSON.parse(this.item.getItem(id))
        const fname=document.querySelector('#fname')
        const username=document.querySelector('#username')
        const mobile=document.querySelector('#phonenumber')
        const submit=document.querySelector('input[type=submit]')
        const email=document.querySelector('#email')
        fname.value=user.name
        username.value=user.username
        mobile.value=user.mobile
        email.value=user.email
        submit.value="Save"
        submit.addEventListener('click',()=>{
            submit.value='Submit'
            this.item.setItem('key',id)
            this.add({
                name:fname.value.trim(),
                username:username.value.trim(),
                email:email.value.trim(),
                phone:phonenumber.value.trim()
            })
        })
    },
    view:function(id){
        this.item.setItem('view',id)
        location.href='./viewPage.html'
    }
}

document.querySelector('form').addEventListener('submit',(e) => {
    document.querySelector('#fname').value=''
    document.querySelector('#username').value=''
    document.querySelector('#email').value=''
    document.querySelector('#phonenumber').value=''
    e.preventDefault()
})
users.render()