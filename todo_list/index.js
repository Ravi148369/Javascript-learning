const person={
    task:[],
    add:()=>{
        const task={
            taskname:document.getElementById('task').value,
            status:'incomplete'
        }
        person.task.push(task);
        person.render(person.task)
    },
    render:(tasks)=>{
        const div=document.getElementById('div')
        div.innerHTML=''
        tasks.map((element,index)=>{
            div.innerHTML+=`<div class='taskdiv'>
                                <p>${element.taskname}</p>
                                <button onclick=person.remove(this,${index})>delete</button>
                            </div
                            `
        })
    },
    remove:(element,index)=>{
        element.parentElement.remove()
        delete(person.task[index])
        person.task=person.task.filter(value=>value)
        person.render(person.task)
    }
}